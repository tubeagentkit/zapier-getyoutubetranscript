const { version } = require('./package.json');
const { version: platformVersion } = require('zapier-platform-core');
const authentication = require('./authentication');
const { addAuthHeader, handleErrors } = require('./api');
const transcript = require('./creates/transcript');
const search = require('./creates/search');
const channelVideos = require('./creates/channelVideos');

module.exports = {
  version,
  platformVersion,
  authentication,
  // Inputs are passed through as typed; each action already trims and omits empty values itself.
  flags: { cleanInputData: false },
  beforeRequest: [addAuthHeader],
  afterResponse: [handleErrors],
  triggers: {},
  searches: {},
  creates: {
    [transcript.key]: transcript,
    [search.key]: search,
    [channelVideos.key]: channelVideos,
  },
};
