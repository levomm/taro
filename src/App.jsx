import { useState } from 'react'
import { ShuffleScreen, ResultScreen } from './components/Cards.jsx'

function App() {
  const [step, setStep] = useState('spread')
  const [question, setQuestion] = useState('Mis ootab mind täna?')
  const [result, setResult] = useState(null)

  const handleSpreadSelect = (q) => {
    setQuestion(q)
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

        {step === 'spread' && <SpreadSelector onSelect={handleSpreadSelect} />}

        {step === 'shuffle' && (
          <ShuffleScreen
            question={question}
            onResult={(r) => { setResult(r); setStep('result') }}
          />
        )}

        {step === 'result' && result && (
          <ResultScreen
            result={result}
            onNewReading={() => { setResult(null); setStep('spread') }}
          />
        )}
      </div>
    </div>
  )
}

function SpreadSelector({ onSelect }) {
  const spreads = [
    { id: 'today', name: 'Täna', cards: 1 },
    { id: 'three', name: '3 kaarti', cards: 3 },
    { id: 'celtic', name: 'Celtic Cross', cards: 10, premium: true },
  ]

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <p style={{ textAlign: 'center', marginBottom: '1rem' }}>Küsi tarolt</p>
      {spreads.map(spread => (
        <button
          key={spread.id}
          onClick={() => onSelect('Mis ootab mind täna?')}
          style={{
            width: '100%',
            marginBottom: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(148,163,184,0.8)',
            background: 'rgba(15,23,42,0.8)',
            color: 'inherit',
            display: 'flex',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <span>{spread.name}</span>
          <span style={{ opacity: 0.8 }}>
            {spread.cards} kaarti {spread.premium ? ' • PREMIUM' : ''}
          </span>
        </button>
      ))}
    </div>
  )
}

export default App
