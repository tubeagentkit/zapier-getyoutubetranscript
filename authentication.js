const { BASE_URL } = require('./api');

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText: 'Create a key at [getyoutubetranscript.com/developers](https://getyoutubetranscript.com/developers). The free tier needs no card. Each successful request uses 1 credit; failed requests are not charged.',
    },
  ],
  // /credits is free (0 credits), so testing the connection never spends anything.
  test: async (z) => {
    const response = await z.request({ url: `${BASE_URL}/credits` });
    return response.data.data;
  },
  connectionLabel: '{{plan}} plan',
};
