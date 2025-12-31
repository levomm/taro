import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

const app = express();
const PORT = 5174;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/tarot', async (req, res) => {
  try {
    const { cards } = req.body;
    console.log('KAARDID SAABUTUD:', JSON.stringify(cards, null, 2));
    
    const selectedCards = cards.map(card => ({
      ...card,
      reversed: card.reversed !== undefined ? card.reversed : (Math.random() < 0.45)
    }));
    
    console.log('PERPLEXITY-SAADAB:', JSON.stringify(selectedCards, null, 2));
    
    const prompt = `🌙 TAROT RITUAAL 🌙

Analüüsi neid ${selectedCards.length} kaarti:

${selectedCards.map((card, i) => `${i+1}. ${card.name} ${card.reversed ? '🌀 (varjupool)' : '✨ (valguspoolsus)'}`).join('\n')}

Struktuur:
${selectedCards.map((card, i) => `**${card.name}** ${card.reversed ? '(varjupool)' : '(valguspoolsus)'}:
• Müstiline tähendus: 
• Sinu saatus: 
• Kaart sosistab sulle: `).join('\n')}

Kanaliseeri iidne tarkus. Räägi müstilise häälega. Kasuta sümboleid 🌙✨🌀.

**Üldine energia:** [kokkuvõte]
**Sinu järgmine samm:** [nõuanne]`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-small-online',  // ÕIGE SEARCH MODEL
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const interpretation = data.choices[0].message.content;

    res.json({ 
      cards: selectedCards, 
      interpretation,
      debug: { received: cards.length, reversed: selectedCards.filter(c => c.reversed).length }
    });
  } catch (error) {
    console.error('ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`TARO AI API: http://localhost:${PORT}`);
});
