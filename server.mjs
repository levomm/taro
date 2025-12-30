import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PPLX_API_KEY = process.env.PPLX_API_KEY

// Clean markdown and formatting artifacts from text
function cleanText(text) {
  return text
    // Remove citation brackets like [1], [2], [web:1], etc.
    .replace(/\[[^\]]*\]/g, '')
    // Remove markdown bold/italic
    .replace(/\*\*\*/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Clean up multiple spaces
    .replace(/  +/g, ' ')
    // Clean up multiple line breaks
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

app.post('/api/tarot', async (req, res) => {
  try {
    console.log('Tarot request body:', req.body)
    const { question } = req.body

    if (!question) {
      return res.status(400).json({ error: 'question required' })
    }
    if (!PPLX_API_KEY) {
      return res.status(500).json({ error: 'PPLX_API_KEY missing' })
    }

    const prompt = `
Sa oled kogenud taro lugeja ja kirjutad eesti keeles.
Küsimus: "${question}"

1) Kirjelda kõigepealt olukorra üldist sõnumit.
2) Seejärel too välja 3 taro kaarti, mis seda olukorda sümboliseerivad. Iga kaardi jaoks:
   - nimi (eesti keeles)
   - kas kaart on otse või tagurpidi
   - 1–3 lauset tõlgendust.
3) Lõpus anna 2–3 väga konkreetset praktilist nõuannet küsijale.

Ole konkreetne ja inimlik, mitte liiga uduse spiritual bullshitiga.
`.trim()

    const pplxRes = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PPLX_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'Sa oled müstiline, aga otsekohene taro tõlgendaja.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    if (!pplxRes.ok) {
      const errText = await pplxRes.text()
      console.error('Perplexity error:', pplxRes.status, errText)
      return res.status(500).json({ error: 'AI error' })
    }

    const data = await pplxRes.json()
    const rawText = data.choices?.[0]?.message?.content || 'AI ei vastanud.'
    const text = cleanText(rawText)

    res.json({
      cards: [],
      text,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI error' })
  }
})

const PORT = process.env.PORT || 5174
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
