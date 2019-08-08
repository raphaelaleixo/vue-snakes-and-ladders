export default {
  LOAD_MEMBERS: (state, payload) => {
    state.members = payload;
  },
  CREATE_NEW_MEMBER: (state, payload) => {
    state.members = [...state.members, payload];
  },
  LOAD_PROJECTS: (state, payload) => {
    state.projects = payload;
  },
  CREATE_NEW_PROJECT: (state, payload) => {
    state.projects = [...state.projects, payload];
  },
  LOAD_ACTIVE_PROJECT: (state, payload) => {
    state.activeProject = payload;
  },
};
