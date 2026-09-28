# components/ai — AI user interface

Applies to `components/ai/`. All AI logic lives on the server in [`lib/ai/AGENTS.md`](../../lib/ai/AGENTS.md). These components **never** see the OpenRouter key and **never** call OpenRouter.

---

## 1. Components

OpenRouterKeyModal · KeyStatusCard · ModelCatalog · ModelCard · ModelFilterBar · ModelCapabilityBadge · ModelHealthBadge · TestModelButton · SelectedModelCard · FallbackModelList · SummaryButton · SummaryPanel · SummaryLoadingState · SummaryErrorState · ModelSwitchNotice.

## 2. Key setup flow

1. After sign-in, check (on the server) whether the user has a key saved.
2. If not, show a **dismissible** prompt or modal explaining why the key is needed.
3. Password-masked input, labeled **"OpenRouter API Key"**.
4. **Test & Save** → server verifies the key, encrypts it and marks it verified.
5. On failure, show a safe error that contains no secret material.
6. **Not now** closes the modal. It can be reopened from **Settings → AI**.
7. Never interrupt a user who already has a working key.

After saving, clear the input and never show the key again. The only thing ever displayed is the masked hint ("Key ending …ABCD"). Never put the key in `localStorage`, `sessionStorage`, URLs, cookies or analytics events.

## 3. AI settings page (`/settings/ai`)

```text
AI / OpenRouter
├─ Connection status
│  ├─ Connected / Not connected
│  ├─ Masked key hint
│  ├─ Last verified
│  └─ Re-test / Replace / Remove
├─ Free model catalog
│  ├─ Refresh · Search · Filters · Sort
│  └─ Model cards
├─ Selected model
│  ├─ Current model · Test · Confirmed status
└─ Fallback models
   ├─ Auto fallback ON/OFF
   └─ Ordered fallback list
```

- Show **all** currently eligible free models, not a curated "top" list. Use search, filters and sorting to keep a large catalog usable. Ranking or popularity may appear only as metadata.
- Each model card shows: provider, name, model ID, context length, input/output modalities, supported parameters, current free status, verification state, last checked time, selected state.
- Health states: **Unknown · Testing · Confirmed · Degraded · Failed · Removed**. Always show a text label as well as color. Use plain language, not jargon.
- `openrouter/free` is a router, not a model. Never show it as one permanent model.

## 4. Summary UI

- The summary panel is always labeled **AI-generated summary** and names the model actually used. It's visually separate from the article body.
- While generating: **"Generating summary…"**. Don't show an error on the first model failure.
- If the app switched models: **"We switched to another available model to finish your summary."** (non-blocking).
- Show a final error only after every eligible fallback has failed.
- The spinner must never run forever; the server enforces timeouts.

## 5. UX copy

| State | Copy |
|-------|------|
| No key | Connect OpenRouter to use AI summaries. Your API key stays associated with your account and is protected by the application. |
| Key saved | OpenRouter connected. Your available free models are now loading. |
| Model confirmed | Model confirmed and ready to use. |
| Model unavailable | This model is no longer available for free inference. We refreshed the model list. |
| Automatic failover | The selected model was unavailable, so we switched to another working free model. |
| No model works | No currently available free model could complete this request. Please try again later or refresh the model list. |

Keep UI strings in one place (i18n-ready); see [`app/AGENTS.md`](../../app/AGENTS.md).
