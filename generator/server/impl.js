const crypto = require('crypto');
const projects = [
  { id: 1, name: 'awesome', description: 'asfasgdfhe', initialCoefficient: 1.54 },
  { id: 2, name: 'qwerty', description: 'ytritjghhe', initialCoefficient: 1.34 },
  { id: 3, name: 'ooooo', description: 'avbngdfhe', initialCoefficient: 2.65 }
];

const sprints = [
  { id: 1, enrollmentPeriod: {start: '2019-02-04', end: '2019-02-11'},
    durationPeriod: {start:'2019-02-12', end: '2019-02-19'},
    dateClosed: '', timeBurned: 0, timePlanned: 0, sprintState: 'closed'}
];

module.exports = {
  requestLogin: function (params, body, query, headers) {
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

  getProjects: function (params, body, query, headers) {
    return projects;
  },

  addProject: function (params, body, query, headers) {
    body.id = projects.length + 1;
    projects.push(body);
    return body;
  },

  getSprints: function (params, body, query, headers) {
    return sprints;
  },

  addSprint: function (params, body, query, headers) {
    body.id = sprints.length + 1;
    sprints.push(body);
    return body;
  },
};
