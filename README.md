# GetYouTubeTranscript for Zapier

Zapier integration for the [GetYouTubeTranscript](https://getyoutubetranscript.com) API, built with the Zapier Platform CLI.

Actions:

- **Get Video Transcript**: transcript text for a YouTube URL or video ID, optionally with per-line timestamps.
- **Search YouTube Videos**: matching videos for a query.
- **List Channel Videos**: a channel's uploads, newest first, with a continuation token for the next page.

Authentication is an API key from [getyoutubetranscript.com/developers](https://getyoutubetranscript.com/developers) (free tier, no card).

## Develop

```bash
npm install
GYT_API_KEY=sk_live_... npm test   # live tests against the real API
zapier-platform validate
zapier-platform push
```
