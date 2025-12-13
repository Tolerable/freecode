# FREECODE (ai-ministries.com) Migration Project

**GOAL:** Replace pollinations.ai with stable alternatives before it goes paid.

---

## PROJECT LOCATIONS

| Location | Purpose |
|----------|---------|
| `OneDrive/REPOS/FREECODE/` | Working repo (449 files) |
| `OneDrive/REPOS/FREECODE-FALLBACK/` | Stripped fallback version |
| `OneDrive/AI/ai-ministries.com/` | Development folder (older) |
| GitHub: `Tolerable/freecode` | Production repo |

## THE PROBLEM

**Pollinations.ai is going paid.** 143 files (31.8%) use it for:
- Image generation
- Text generation
- Voice/TTS
- AI chat

## REPLACEMENT OPTIONS

### 1. User-Provided API Keys (Recommended for reliability)
```javascript
// User enters their own key, stored in localStorage
const apiKey = localStorage.getItem('user_openai_key');
// Use OpenAI, Anthropic, or other paid APIs
```

Providers:
- **OpenAI** - GPT-4, DALL-E (reliable, $)
- **Anthropic** - Claude (reliable, $)
- **Google** - Gemini (reliable, $)
- **xAI** - Grok (newer)

### 2. Free/Cheap APIs
- **Groq** - Fast inference, free tier
- **Together AI** - Various models, free tier
- **Hugging Face** - Free inference API
- **OpenRouter** - Multi-model router, pay-per-use

### 3. Backend via Supabase/Netlify
- Store API keys server-side
- Proxy requests through edge functions
- Rate limiting, usage tracking

## FILES THAT NEED MIGRATION

### Priority 1 - Navigation Pages (in main menu)
- pimages.html (Pollinations Images)
- pspeak.html (Pollinations Speak)
- pstream.html (Image Stream)
- tstream.html (Text Stream)
- ai.html (AI Models)

### Priority 2 - Popular Apps
- aichat.html, aichat2.html
- chatbot.html
- imageai.html
- Various AI model interfaces

### Priority 3 - Games/Tools
- Games using AI generation
- Tools using AI features

## MIGRATION STRATEGY

### Phase 1: Key UI Pages
1. Add API key input modal
2. Store in localStorage
3. Replace pollinations calls with OpenAI/Anthropic

### Phase 2: Fallback System
1. Try user's key first
2. Fall back to free API if available
3. Show "upgrade" prompt if all fail

### Phase 3: Backend Option
1. Supabase edge function for API proxying
2. Optional user accounts for key storage
3. Usage metering

## PATTERN FOR REPLACEMENT

```javascript
// OLD (pollinations)
const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);

// NEW (user API key)
async function callAI(prompt) {
    const apiKey = localStorage.getItem('user_openai_key');
    if (!apiKey) {
        showApiKeyModal();
        return;
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }]
        })
    });
    return response.json();
}
```

## TRACKING PROGRESS

Use the format: `filename.html - [STATUS]`
- `[ ]` Not started
- `[P]` In progress
- `[X]` Migrated and tested

---

## NEXT STEPS

1. Pick ONE page to migrate first (suggest: ai.html or aichat.html)
2. Build the API key modal component
3. Test with OpenAI
4. Create reusable pattern
5. Apply to other pages

---

*Project for BLACK (Supervisor Claude) - managed via Claude Colab*
