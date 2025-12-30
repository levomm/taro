import { useState } from 'react'
import { ShuffleScreen, ResultScreen } from './components/Cards.jsx'

function App() {
  const [step, setStep] = useState('spread')
  const [question, setQuestion] = useState('')
  const [cardCount, setCardCount] = useState(3)
  const [result, setResult] = useState(null)

  const handleSpreadSelect = (spread) => {
    if (!question.trim()) {
      alert('Kirjuta enne küsimus!')
      return
    }
    setCardCount(spread.cards)
    setStep('shuffle')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4c1d95 0%, #0f172a 50%, #000000 100%)',
      color: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px',
        borderRadius: '1.5rem',
        background: 'rgba(15,23,42,0.92)',
        border: '1px solid rgba(148,163,184,0.7)',
        padding: '2.5rem'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>✦ TARO AI ✦</h1>

        {step === 'spread' && <SpreadSelector question={question} setQuestion={setQuestion} onSelect={handleSpreadSelect} />}

        {step === 'shuffle' && (
          <ShuffleScreen
            question={question}
            cardCount={cardCount}
            onResult={(r) => { setResult(r); setStep('result') }}
          />
        )}

        {step === 'result' && result && (
          <ResultScreen
            result={result}
            onNewReading={() => { setResult(null); setQuestion(''); setStep('spread') }}
          />
        )}
      </div>
    </div>
  )
}

function SpreadSelector({ question, setQuestion, onSelect }) {
  const spreads = [
    { id: 'today', name: 'Täna', cards: 1, desc: 'Kiire vastus päeva kohta' },
    { id: 'three', name: '3 kaarti', cards: 3, desc: 'Minevik, olevik, tulevik' },
    { id: 'celtic', name: 'Celtic Cross', cards: 10, premium: true, desc: 'Sügav analüüs olukorrast' },
  ]

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Intro */}
      <div style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'rgba(251,191,36,0.1)',
        borderRadius: '1rem',
        border: '1px solid rgba(251,191,36,0.3)',
        lineHeight: '1.6'
      }}>
        <p style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>
          <strong style={{ color: '#fbbf24' }}>Esimene AI-põhine tarot Eestis.</strong> Kasutame päris Rider-Waite kaarti ja täiustatud tehisaru, et pakkuda sulle isiklikke ja sügavaid vastuseid.
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          Iga lugemine on unikaalne – valid ise kaardid, AI tõlgendab nende sümboolikat ja annab konkreetse nõu.
        </p>
      </div>

      {/* Juhised */}
      <div style={{
        marginBottom: '1.5rem',
        padding: '1.25rem',
        background: 'rgba(148,163,184,0.1)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(148,163,184,0.3)'
      }}>
        <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Kuidas küsida?</p>
        <ul style={{ 
          fontSize: '0.85rem', 
          opacity: 0.9, 
          paddingLeft: '1.25rem',
          margin: 0,
          lineHeight: '1.5'
        }}>
          <li>Küsi avatud küsimusi ("Kuidas...?", "Mis mind aitab...?", "Mida peaksin teadma...?")</li>
          <li>Väldi jah/ei küsimusi – tarot näitab nuanäänse pilti</li>
          <li>Ole konkreetne, aga mitte liiga kitsas</li>
        </ul>
      </div>

      {/* Küsimuse input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem', 
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          Sinu küsimus
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Näiteks: Kuidas ma saan oma tööelu paremini tasakaalustada?"
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(148,163,184,0.5)',
            background: 'rgba(15,23,42,0.8)',
            color: '#f9fafb',
            fontSize: '0.95rem',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
      </div>

      {/* Spread valik */}
      <p style={{ 
        textAlign: 'center', 
        marginBottom: '1rem',
        fontSize: '0.9rem',
        opacity: 0.8
      }}>Vali lugemise tüüp</p>
      {spreads.map(spread => (
        <button
          key={spread.id}
          onClick={() => onSelect(spread)}
          style={{
            width: '100%',
            marginBottom: '0.75rem',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(148,163,184,0.8)',
            background: 'rgba(15,23,42,0.8)',
            color: 'inherit',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15,23,42,0.95)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(15,23,42,0.8)'}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 600 }}>{spread.name}</span>
            <span style={{ opacity: 0.8, fontSize: '0.85rem' }}>
              {spread.cards} {spread.cards === 1 ? 'kaart' : 'kaarti'}{spread.premium ? ' • PREMIUM' : ''}
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{spread.desc}</div>
        </button>
      ))}
    </div>
  )
}

export default App
