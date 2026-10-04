const BASE_URL = 'https://getyoutubetranscript.com/api/v1';

// Sends the key on every request so each action only states its own path and params.
const addAuthHeader = (request, z, bundle) => {
  if (bundle.authData && bundle.authData.api_key) {
    request.headers = { ...request.headers, Authorization: `Bearer ${bundle.authData.api_key}` };
  }
  request.headers = { ...request.headers, 'User-Agent': 'zapier-getyoutubetranscript/1.0' };
  return request;
};

// Surfaces the API's own code and message instead of a generic HTTP error.
const handleErrors = (response, z) => {
  if (response.status < 400) return response;
  let body = {};
  try { body = response.json || JSON.parse(response.content); } catch (e) { body = {}; }
  const code = body.code || `HTTP_${response.status}`;
  const message = body.message || `Request failed with status ${response.status}`;
  if (response.status === 401) throw new z.errors.RefreshAuthError(`${message} (${code})`);
  if (response.status === 429) throw new z.errors.ThrottledError(`${message} (${code})`, 60);
  throw new z.errors.Error(message, code, response.status);
};

module.exports = { BASE_URL, addAuthHeader, handleErrors };
