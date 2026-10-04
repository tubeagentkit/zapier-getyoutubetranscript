const { BASE_URL } = require('../api');

const perform = async (z, bundle) => {
  const { query, country, language, limit } = bundle.inputData;
  const params = { q: query, type: 'video' };
  if (country) params.country = country;
  if (language) params.language = language;
  if (limit) params.limit = limit;
  const response = await z.request({ url: `${BASE_URL}/search`, params });
  const data = response.data.data || {};
  const videos = (data.video_results || []).map((v) => ({ ...v, url: v.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : v.link }));
  return {
    id: `search-${query}`,
    query,
    count: videos.length,
    first_video_id: videos[0] ? videos[0].videoId : null,
    first_video_title: videos[0] ? videos[0].title : null,
    first_video_url: videos[0] ? videos[0].url : null,
    videos,
    continuation_token: data.continuation_token || null,
  };
};

module.exports = {
  key: 'search_youtube',
  noun: 'Search',
  display: {
    label: 'Search YouTube Videos',
    description: 'Searches YouTube and returns matching videos, ready to feed into Get Video Transcript.',
  },
  operation: {
    inputFields: [
      { key: 'query', label: 'Search Query', required: true, helpText: 'At least 2 characters.' },
      { key: 'limit', label: 'Max Results', type: 'integer', required: false, default: '10', helpText: 'Up to 50.' },
      { key: 'country', label: 'Country', required: false, helpText: 'Two-letter country code, for example us.' },
      { key: 'language', label: 'Language', required: false, helpText: 'Language code, for example en.' },
    ],
    perform,
    sample: {
      id: 'search-lofi beats',
      query: 'lofi beats',
      count: 1,
      first_video_id: 'jfKfPfyJRdk',
      first_video_title: 'lofi hip hop radio',
      first_video_url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      videos: [{ videoId: 'jfKfPfyJRdk', title: 'lofi hip hop radio', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' }],
      continuation_token: null,
    },
  },
};
