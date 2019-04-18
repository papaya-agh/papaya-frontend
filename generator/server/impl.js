module.exports = {
  requestLogin: function (body, query) {
    console.log(body);
    console.log(query);

    return {
      valid: true,
      token: 'token',
      errorMessage: ''
    }
  },
};
