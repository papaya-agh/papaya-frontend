const crypto = require('crypto');

module.exports = {
  requestLogin: function (body, query, headers) {
    const token = crypto.randomBytes(32).toString('hex');
    if (body.username === 'a') {
      return {
        valid: false,
        errorMessage: 'error'
      }
    }
    return {
      valid: true,
      token: token,
      errorMessage: ''
    }
  },
};
