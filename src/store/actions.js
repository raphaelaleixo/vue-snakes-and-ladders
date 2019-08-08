import database from '@/database';

const snapshotToArray = snapshot => {
  var returnArr = [];
  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

export default {
  loadMemberList: async context => {
    await database.ref('members/').once('value', function(snapshot) {
      context.commit('LOAD_MEMBERS', snapshotToArray(snapshot));
    });
  },
  loadProjectList: async context => {
    await database.ref('projects/').once('value', function(snapshot) {
      context.commit('LOAD_PROJECTS', snapshotToArray(snapshot));
    });
  },
  loadActiveProject: async (context, payload) => {
    const loadedProject = await database
      .ref('projects/')
      .orderByChild('url')
      .equalTo(payload);
    await loadedProject.on('child_added', snapshot => {
      context.commit('LOAD_ACTIVE_PROJECT', snapshot.val());
    });
  },
  addMember: async (context, payload) => {
    const memberList = database.ref('members/');
    const newMember = memberList.push();
    await newMember.set({
      ...payload,
    });
    context.commit('CREATE_NEW_MEMBER', payload);
  },
  addProject: async (context, payload) => {
    const projectList = database.ref('projects/');
    const newProject = projectList.push();
    await newProject.set({
      ...payload,
    });
    context.commit('CREATE_NEW_PROJECT', payload);
  },
};
