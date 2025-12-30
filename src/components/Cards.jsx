import { useState } from 'react'

const TAROT_DECK = [
  { name: 'The Fool', nameShort: 'ar00' },
  { name: 'The Magician', nameShort: 'ar01' },
  { name: 'The High Priestess', nameShort: 'ar02' },
  { name: 'The Empress', nameShort: 'ar03' },
  { name: 'The Emperor', nameShort: 'ar04' },
  { name: 'The Hierophant', nameShort: 'ar05' },
  { name: 'The Lovers', nameShort: 'ar06' },
  { name: 'The Chariot', nameShort: 'ar07' },
  { name: 'Strength', nameShort: 'ar08' },
  { name: 'The Hermit', nameShort: 'ar09' },
  { name: 'Wheel of Fortune', nameShort: 'ar10' },
  { name: 'Justice', nameShort: 'ar11' },
  { name: 'The Hanged Man', nameShort: 'ar12' },
  { name: 'Death', nameShort: 'ar13' },
  { name: 'Temperance', nameShort: 'ar14' },
  { name: 'The Devil', nameShort: 'ar15' },
  { name: 'The Tower', nameShort: 'ar16' },
  { name: 'The Star', nameShort: 'ar17' },
  { name: 'The Moon', nameShort: 'ar18' },
  { name: 'The Sun', nameShort: 'ar19' },
  { name: 'Judgement', nameShort: 'ar20' },
  { name: 'The World', nameShort: 'ar21' },
  { name: 'Ace of Wands', nameShort: 'waac' },
  { name: 'Two of Wands', nameShort: 'wa02' },
  { name: 'Three of Wands', nameShort: 'wa03' },
  { name: 'Four of Wands', nameShort: 'wa04' },
  { name: 'Five of Wands', nameShort: 'wa05' },
  { name: 'Six of Wands', nameShort: 'wa06' },
  { name: 'Seven of Wands', nameShort: 'wa07' },
  { name: 'Eight of Wands', nameShort: 'wa08' },
  { name: 'Nine of Wands', nameShort: 'wa09' },
  { name: 'Ten of Wands', nameShort: 'wa10' },
  { name: 'Page of Wands', nameShort: 'wapa' },
  { name: 'Knight of Wands', nameShort: 'wakn' },
  { name: 'Queen of Wands', nameShort: 'waqu' },
  { name: 'King of Wands', nameShort: 'waki' },
  { name: 'Ace of Cups', nameShort: 'cuac' },
  { name: 'Two of Cups', nameShort: 'cu02' },
  { name: 'Three of Cups', nameShort: 'cu03' },
  { name: 'Four of Cups', nameShort: 'cu04' },
  { name: 'Five of Cups', nameShort: 'cu05' },
  { name: 'Six of Cups', nameShort: 'cu06' },
  { name: 'Seven of Cups', nameShort: 'cu07' },
  { name: 'Eight of Cups', nameShort: 'cu08' },
  { name: 'Nine of Cups', nameShort: 'cu09' },
  { name: 'Ten of Cups', nameShort: 'cu10' },
  { name: 'Page of Cups', nameShort: 'cupa' },
  { name: 'Knight of Cups', nameShort: 'cukn' },
  { name: 'Queen of Cups', nameShort: 'cuqu' },
  { name: 'King of Cups', nameShort: 'cuki' },
  { name: 'Ace of Swords', nameShort: 'swac' },
  { name: 'Two of Swords', nameShort: 'sw02' },
  { name: 'Three of Swords', nameShort: 'sw03' },
  { name: 'Four of Swords', nameShort: 'sw04' },
  { name: 'Five of Swords', nameShort: 'sw05' },
  { name: 'Six of Swords', nameShort: 'sw06' },
  { name: 'Seven of Swords', nameShort: 'sw07' },
  { name: 'Eight of Swords', nameShort: 'sw08' },
  { name: 'Nine of Swords', nameShort: 'sw09' },
  { name: 'Ten of Swords', nameShort: 'sw10' },
  { name: 'Page of Swords', nameShort: 'swpa' },
  { name: 'Knight of Swords', nameShort: 'swkn' },
  { name: 'Queen of Swords', nameShort: 'swqu' },
  { name: 'King of Swords', nameShort: 'swki' },
  { name: 'Ace of Pentacles', nameShort: 'peac' },
  { name: 'Two of Pentacles', nameShort: 'pe02' },
  { name: 'Three of Pentacles', nameShort: 'pe03' },
  { name: 'Four of Pentacles', nameShort: 'pe04' },
  { name: 'Five of Pentacles', nameShort: 'pe05' },
  { name: 'Six of Pentacles', nameShort: 'pe06' },
  { name: 'Seven of Pentacles', nameShort: 'pe07' },
  { name: 'Eight of Pentacles', nameShort: 'pe08' },
  { name: 'Nine of Pentacles', nameShort: 'pe09' },
  { name: 'Ten of Pentacles', nameShort: 'pe10' },
  { name: 'Page of Pentacles', nameShort: 'pepa' },
  { name: 'Knight of Pentacles', nameShort: 'pekn' },
  { name: 'Queen of Pentacles', nameShort: 'pequ' },
  { name: 'King of Pentacles', nameShort: 'peki' },
]

function getCardImageUrl(nameShort) {
  return `https://sacred-texts.com/tarot/pkt/img/${nameShort}.jpg`
}

function Card({ card, isSelected, onSelect }) {
  const style = {
    width: '70px',
    height: '110px',
    borderRadius: '0.5rem',
    border: isSelected 
      ? '3px solid #fbbf24' 
      : '2px solid rgba(250,204,21,0.5)',
    background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    position: 'relative',
    boxShadow: isSelected ? '0 0 20px rgba(251,191,36,0.6)' : 'none',
    transition: 'all 0.2s ease',
  }

  return (
    <div 
      style={style}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onSelect()
      }}
      onTouchEnd={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onSelect()
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.25rem',
        color: '#fbbf24',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: '1.5rem' }}>✦</div>
        <div style={{ 
          width: '30px', 
          height: '30px', 
          borderRadius: '50%',
          border: '2px solid #fbbf24',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem'
        }}>☽</div>
        <div style={{ fontSize: '0.6rem' }}>✦✦✦</div>
      </div>
    </div>
  )
}

export function ShuffleScreen({ question, onResult }) {
  const [cards, setCards] = useState(() => 
    TAROT_DECK.map((card, i) => ({ id: `card-${i}`, ...card }))
  )
  const [selectedCards, setSelectedCards] = useState([])
  const [shuffling, setShuffling] = useState(false)
  const [countdown, setCountdown] = useState(7)
  const [error, setError] = useState(null)

  const handleCardSelect = (card) => {
    setSelectedCards(prev => {
      const isAlreadySelected = prev.find(c => c.id === card.id)
      if (isAlreadySelected) {
        return prev.filter(c => c.id !== card.id)
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, card]
    })
  }

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setSelectedCards([])
  }

  const drawCards = async () => {
    if (!question.trim()) {
      setError('Kirjuta enne küsimus.')
      return
    }

    if (selectedCards.length !== 3) {
      setError('Vali täpselt 3 kaarti!')
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
      const drawnCards = selectedCards.map(c => ({
        name: c.name,
        nameShort: c.nameShort,
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
        flexWrap: 'wrap',
        alignItems: 'center'
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

        <div style={{
          color: selectedCards.length === 3 ? '#10b981' : '#94a3b8',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          {selectedCards.length}/3 valitud
        </div>

        <button
          onClick={drawCards}
          disabled={shuffling || selectedCards.length !== 3}
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '999px',
            border: 'none',
            cursor: selectedCards.length === 3 ? 'pointer' : 'not-allowed',
            background: selectedCards.length === 3 
              ? 'linear-gradient(90deg,#fbbf24,#f97316)' 
              : 'rgba(148,163,184,0.3)',
            color: selectedCards.length === 3 ? '#111827' : '#64748b',
            fontWeight: 700,
          }}
        >
          {shuffling ? `Rituaal... ${countdown}s` : '✨ Tõmba kaardid'}
        </button>
      </div>

      {selectedCards.length > 0 && (
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          background: 'rgba(251,191,36,0.1)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(251,191,36,0.3)'
        }}>
          <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.8 }}>Valitud kaardid:</div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {selectedCards.map((card, i) => (
              <div key={card.id} style={{
                width: '60px',
                height: '95px',
                borderRadius: '0.5rem',
                border: '2px solid #fbbf24',
                background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #312e81 50%, #1e1b4b 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                color: '#fbbf24',
                position: 'relative'
              }}>
                <div style={{ fontSize: '1.2rem' }}>✦</div>
                <div style={{ 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%',
                  border: '2px solid #fbbf24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}>☽</div>
                <div style={{ fontSize: '0.5rem' }}>✦✦✦</div>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  background: '#fbbf24',
                  color: '#111827',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700
                }}>
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
          <Card 
            key={card.id}
            card={card}
            isSelected={selectedCards.find(c => c.id === card.id)}
            onSelect={() => handleCardSelect(card)}
          />
        ))}
      </div>

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
              width: '120px',
              height: '200px',
              borderRadius: '0.75rem',
              border: '2px solid rgba(250,204,21,0.7)',
              background: '#000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transform: card.reversed ? 'rotate(180deg)' : 'none',
            }}
          >
            <img
              src={getCardImageUrl(card.nameShort)}
              alt={card.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      <p
        style={{
          marginBottom: '1.5rem',
          maxWidth: 600,
          marginInline: 'auto',
          lineHeight: '1.6',
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
