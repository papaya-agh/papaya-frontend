const crypto = require('crypto');
const projects = [
  {id: 1, name: 'awesome', description: 'asfasgdfhe', initialCoefficient: 1.54},
  {id: 2, name: 'qwerty', description: 'ytritjghhe', initialCoefficient: 1.34},
  {id: 3, name: 'ooooo', description: 'avbngdfhe', initialCoefficient: 2.65}
];
const sprints = [];

const projectSprints = {
  1: {
    mockDeclarable: true,
  },
  2: {
    mockDeclarable: false,
  },
};

const userAvailability = {
  timeAvailable: 0,
  timeRemaining: 0,
  notes: '',
};

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
    const projectId = params.projectId;
    const sprintStates = query.sprintStates;
    return sprints;

    if (!Array.isArray(sprintStates)) {
      if (sprintStates == 'DECLARABLE') {
        if (projectSprints[projectId].mockDeclarable) {
          return [mockDeclarableSprint(1337)];
        } else {
          return [];
        }
      }
    }
  },

  addSprint: function (params, body, query, headers) {
    body.id = sprints.length + 1;
    sprints.push(body);
    return body;
  },

  getUserAvailability: function (params, body, query, headers) {
    return Object.assign({}, userAvailability, {userId: null});
  },

  updateUserAvailability: function (params, body, query, headers) {
    userAvailability.timeRemaining = body.timeRemaining;
    userAvailability.timeAvailable = body.timeAvailable;
    userAvailability.notes = body.notes;
    return body;
  },

  getUsersFromProject: function (params, body, query, headers) {
    const projectId = params.projectId;
    const usersInProject = projectsMembers[projectId];

    const result = [];
    for (const member of usersInProject) {
      const user = usersById[member.userId];
      result.push({
        role: member.role,
        userDetails: user,
        userId: member.userId,
      });
    }

    return result;
  },

  setUserRole: function (params, body, query, headers) {
    const projectId = params.projectId;
    const userId = params.userId;
    const user = projectsMembers[projectId].find(m => m.userId == userId);

    user.role = body.role;
  },

  removeUserFromProject: function (params, body, query, headers) {
    const projectId = params.projectId;
    const userId = params.userId;

    const project = projectsMembers[projectId];
    const user = project.find(m => m.userId == userId);
    const userIndex = project.indexOf(user);
    project.splice(userIndex);
  },

  addUserToProject: function (params, body, query, headers) {
    const projectId = params.projectId;
    const email = body.email;

    for (const userId of Object.keys(usersById)) {
      if (usersById[userId].email === email) {
        projectsMembers[projectId].push({
          userId: userId,
          role: 'member'
        });
        return {
          role: 'member',
          userDetails: usersById[userId],
          userId: userId,
        };
      }
    }
  },
};

function mockDeclarableSprint(sprintId) {
  const now = new Date();
  const enrollmentStart = new Date().setDate(now.getDate() - 2);
  const enrollmentEnd = new Date().setDate(now.getDate() + 2);
  const durationStart = new Date().setDate(now.getDate() + 3);
  const durationEnd = new Date().setDate(now.getDate() + 10);

  return {
    id: sprintId,
    enrollmentPeriod: {
      start: enrollmentStart,
      end: enrollmentEnd,
    },
    durationPeriod: {
      start: durationStart,
      end: durationEnd,
    }
  }
}
