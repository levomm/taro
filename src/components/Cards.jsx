import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const TAROT_DECK = [
  'The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor',
  'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
  'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance',
  'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World',
  'Ace of Wands', 'Two of Wands', 'Three of Wands', 'Four of Wands', 'Five of Wands',
  'Six of Wands', 'Seven of Wands', 'Eight of Wands', 'Nine of Wands', 'Ten of Wands',
  'Page of Wands', 'Knight of Wands', 'Queen of Wands', 'King of Wands',
  'Ace of Cups', 'Two of Cups', 'Three of Cups', 'Four of Cups', 'Five of Cups',
  'Six of Cups', 'Seven of Cups', 'Eight of Cups', 'Nine of Cups', 'Ten of Cups',
  'Page of Cups', 'Knight of Cups', 'Queen of Cups', 'King of Cups',
  'Ace of Swords', 'Two of Swords', 'Three of Swords', 'Four of Swords', 'Five of Swords',
  'Six of Swords', 'Seven of Swords', 'Eight of Swords', 'Nine of Swords', 'Ten of Swords',
  'Page of Swords', 'Knight of Swords', 'Queen of Swords', 'King of Swords',
  'Ace of Pentacles', 'Two of Pentacles', 'Three of Pentacles', 'Four of Pentacles', 'Five of Pentacles',
  'Six of Pentacles', 'Seven of Pentacles', 'Eight of Pentacles', 'Nine of Pentacles', 'Ten of Pentacles',
  'Page of Pentacles', 'Knight of Pentacles', 'Queen of Pentacles', 'King of Pentacles',
]

function SortableCard({ id, name }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '70px',
    height: '110px',
    borderRadius: '0.5rem',
    border: '2px solid rgba(250,204,21,0.5)',
    background: isDragging 
      ? 'rgba(251,191,36,0.2)' 
      : 'radial-gradient(circle at top, #4c1d95, #020617)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.65rem',
    color: '#e5e7eb',
    cursor: 'grab',
    opacity: isDragging ? 0.5 : 1,
    padding: '0.25rem',
    textAlign: 'center',
    userSelect: 'none',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{name}</span>
    </div>
  )
}

export function ShuffleScreen({ question, onResult }) {
  const [cards, setCards] = useState(() => 
    TAROT_DECK.map((name, i) => ({ id: `card-${i}`, name }))
  )
  const [shuffling, setShuffling] = useState(false)
  const [countdown, setCountdown] = useState(7)
  const [error, setError] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex(c => c.id === active.id)
        const newIndex = items.findIndex(c => c.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
  }

  const drawCards = async () => {
    if (!question.trim()) {
      setError('Kirjuta enne küsimus.')
      return
    }

    setShuffling(true)
    setCountdown(7)
    setError(null)

    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer)
          return 0
        }
        return c - 1
      })
    }, 1000)

    try {
      const drawnCards = cards.slice(0, 3).map(c => ({
        name: c.name,
        reversed: Math.random() > 0.5
      }))

      const res = await fetch('http://localhost:5174/api/tarot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question,
          cards: drawnCards 
        }),
      })

      if (!res.ok) {
        throw new Error('API viga: ' + res.status)
      }

      const data = await res.json()

      onResult({
        cards: drawnCards,
        text: data.text || 'AI ei andnud selget vastust.',
      })
    } catch (e) {
      console.error(e)
      setError('Midagi läks valesti AI vastusega. Proovi uuesti.')
    } finally {
      setShuffling(false)
      setCountdown(0)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '1rem', opacity: 0.8 }}>"{question}"</p>

      <div style={{ 
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={shuffleCards}
          disabled={shuffling}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.8)',
            cursor: 'pointer',
            background: 'rgba(15,23,42,0.8)',
            color: 'inherit',
            fontWeight: 600,
          }}
        >
          🔀 Sega laud
        </button>

        <button
          onClick={drawCards}
          disabled={shuffling}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(90deg,#fbbf24,#f97316)',
            color: '#111827',
            fontWeight: 700,
          }}
        >
          {shuffling ? `Rituaal... ${countdown}s` : '✨ Tõmba kaardid'}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={cards.map(c => c.id)} strategy={rectSortingStrategy}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
            gap: '0.5rem',
            maxHeight: '500px',
            overflowY: 'auto',
            padding: '1rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '1rem',
            border: '1px solid rgba(148,163,184,0.3)',
          }}>
            {cards.map((card) => (
              <SortableCard key={card.id} id={card.id} name={card.name} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {error && (
        <p style={{ marginTop: '1rem', color: '#fca5a5' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export function ResultScreen({ result, onNewReading }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {result.cards.map((card, i) => (
          <div
            key={i}
            style={{
              width: '90px',
              height: '140px',
              borderRadius: '0.75rem',
              border: '2px solid rgba(250,204,21,0.7)',
              background: 'radial-gradient(circle at top,#4c1d95,#020617)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#e5e7eb',
              transform: card.reversed ? 'rotate(180deg)' : 'none',
              padding: '0.5rem',
              textAlign: 'center',
              fontSize: '0.75rem',
            }}
          >
            {card.name}
          </div>
        ))}
      </div>

      <p
        style={{
          marginBottom: '1.5rem',
          maxWidth: 600,
          marginInline: 'auto',
        }}
      >
        {result.text}
      </p>

      <button
        onClick={onNewReading}
        style={{
          padding: '0.75rem 2rem',
          borderRadius: '999px',
          border: '1px solid rgba(148,163,184,0.8)',
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        Uus lugemine
      </button>
    </div>
  )
}
