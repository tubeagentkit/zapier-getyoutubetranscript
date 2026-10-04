const { BASE_URL } = require('../api');

const perform = async (z, bundle) => {
  const { channel, continuation } = bundle.inputData;
  const params = continuation ? { continuation } : { channel };
  const response = await z.request({ url: `${BASE_URL}/channel/videos`, params });
  const data = response.data.data || {};
  const videos = data.videos || [];
  return {
    id: `channel-${channel || 'page'}-${continuation || 'first'}`,
    channel: channel || null,
    count: videos.length,
    latest_video_id: videos[0] ? videos[0].id : null,
    latest_video_title: videos[0] ? videos[0].title : null,
    latest_video_url: videos[0] ? videos[0].link : null,
    videos,
    has_more: Boolean(data.has_more),
    continuation_token: data.continuation_token || null,
  };
};

module.exports = {
  key: 'list_channel_videos',
  noun: 'Channel Videos',
  display: {
    label: 'List Channel Videos',
    description: "Lists a YouTube channel's uploaded videos, newest first, one page at a time.",
  },
  operation: {
    inputFields: [
      { key: 'channel', label: 'Channel', required: false, helpText: 'Channel @handle, URL or channel ID. Required unless Continuation Token is set.' },
      { key: 'continuation', label: 'Continuation Token', required: false, helpText: 'The Continuation Token from a previous run, to fetch the next page.' },
    ],
    perform,
    sample: {
      id: 'channel-@mkbhd-first',
      channel: '@mkbhd',
      count: 1,
      latest_video_id: '3iRUwVzRDZQ',
      latest_video_title: 'Xiaomi 18 Fold: How Does This Happen',
      latest_video_url: 'https://www.youtube.com/watch?v=3iRUwVzRDZQ',
      videos: [{ position: 1, id: '3iRUwVzRDZQ', title: 'Xiaomi 18 Fold: How Does This Happen', link: 'https://www.youtube.com/watch?v=3iRUwVzRDZQ', views: '6.2M', published_time: '1d ago', length: '10:47' }],
      has_more: true,
      continuation_token: 'c_pqHR9v13sqaqxlcKhA4MnA',
    },
  },
};
