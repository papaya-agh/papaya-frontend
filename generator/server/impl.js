const crypto = require('crypto');
const projects = [
  { id: 1, name: 'awesome', description: 'asfasgdfhe', initialCoefficient: 1.54 },
  { id: 2, name: 'qwerty', description: 'ytritjghhe', initialCoefficient: 1.34 },
  { id: 3, name: 'ooooo', description: 'avbngdfhe', initialCoefficient: 2.65 }
];

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

  getProjects: function (body, query, headers) {
    return projects;
  },

  addProject: function (body, query, headers) {
    body.id = projects.length + 1
    projects.push(body);
    return body;
  }
};
