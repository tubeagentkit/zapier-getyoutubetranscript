// Live tests against the real API. Run with GYT_API_KEY set; skipped otherwise.
const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

const key = process.env.GYT_API_KEY;
const run = key ? test : test.skip;
const authData = { api_key: key };

run('auth test returns the plan', async () => {
  const result = await appTester(App.authentication.test, { authData });
  expect(result.plan).toBeTruthy();
});

run('get transcript with timestamps', async () => {
  const r = await appTester(App.creates.get_transcript.operation.perform, { authData, inputData: { video: 'https://youtu.be/jNQXAC9IVRw', timestamps: true } });
  expect(r.video_id).toBe('jNQXAC9IVRw');
  expect(r.transcript.length).toBeGreaterThan(20);
  expect(r.segments.length).toBeGreaterThan(0);
});

run('invalid video surfaces the API error code', async () => {
  await expect(appTester(App.creates.get_transcript.operation.perform, { authData, inputData: { video: 'notavideo!!' } })).rejects.toThrow(/recognizable|INVALID_URL/);
});

run('bad key asks to reconnect', async () => {
  await expect(appTester(App.authentication.test, { authData: { api_key: 'sk_live_wrong' } })).rejects.toThrow(/invalid|revoked/i);
});

run('search returns videos', async () => {
  const r = await appTester(App.creates.search_youtube.operation.perform, { authData, inputData: { query: 'lofi beats', limit: 5 } });
  expect(r.count).toBeGreaterThan(0);
  expect(r.first_video_url).toMatch(/youtube\.com\/watch/);
});

run('channel videos returns a page and a cursor', async () => {
  const r = await appTester(App.creates.list_channel_videos.operation.perform, { authData, inputData: { channel: '@mkbhd' } });
  expect(r.count).toBeGreaterThan(0);
  expect(r.continuation_token).toBeTruthy();
});
