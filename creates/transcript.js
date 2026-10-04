const { BASE_URL } = require('../api');

const perform = async (z, bundle) => {
  const { video, language, timestamps } = bundle.inputData;
  const params = { v: video };
  if (language) params.language = language;
  if (timestamps) params.timestamps = 'true';
  const response = await z.request({ url: `${BASE_URL}/transcript`, params });
  const data = response.data.data;
  return { ...data, id: data.video_id, url: `https://www.youtube.com/watch?v=${data.video_id}` };
};

module.exports = {
  key: 'get_transcript',
  noun: 'Transcript',
  display: {
    label: 'Get Video Transcript',
    description: 'Gets the transcript of a YouTube video, optionally with per-line timestamps.',
  },
  operation: {
    inputFields: [
      { key: 'video', label: 'Video URL or ID', required: true, helpText: 'A YouTube URL (watch, youtu.be or shorts) or the 11-character video ID.' },
      { key: 'language', label: 'Language', required: false, default: 'en', helpText: 'Language code, for example en, es or de. Defaults to English.' },
      { key: 'timestamps', label: 'Include Timestamps', type: 'boolean', required: false, default: 'false', helpText: 'Adds segments with start and duration in seconds.' },
    ],
    perform,
    sample: {
      id: 'jNQXAC9IVRw',
      video_id: 'jNQXAC9IVRw',
      url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      language_code: 'en',
      title: 'Me at the zoo',
      author_name: 'jawed',
      author_url: 'https://www.youtube.com/@jawed',
      thumbnail_url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg',
      transcript: 'All right, so here we are, in front of the elephants...',
      word_count: 39,
    },
    outputFields: [
      { key: 'video_id', label: 'Video ID' },
      { key: 'url', label: 'Video URL' },
      { key: 'title', label: 'Title' },
      { key: 'author_name', label: 'Channel Name' },
      { key: 'author_url', label: 'Channel URL' },
      { key: 'language_code', label: 'Language' },
      { key: 'transcript', label: 'Transcript' },
      { key: 'word_count', label: 'Word Count', type: 'integer' },
      { key: 'thumbnail_url', label: 'Thumbnail URL' },
      { key: 'segments[]start', label: 'Segment Start (seconds)', type: 'number' },
      { key: 'segments[]duration', label: 'Segment Duration (seconds)', type: 'number' },
      { key: 'segments[]text', label: 'Segment Text' },
    ],
  },
};
