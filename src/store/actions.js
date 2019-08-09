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
  addGame: async (context, payload) => {
    const gameList = database.ref('/');
    const game = gameList.push();
    const gamekey = game.getKey();

    const createPlayers = () => {
      const players = [];
      const numberOfPlayers = payload.numberOfPlayers;
      for (let i = 0; i < numberOfPlayers; i++) {
        players.push({
          position: 1
        })
      }
      return players
    }
    game.set({
      ...payload,
      players: createPlayers(),
      id: gamekey
    });
    context.commit('CREATE_NEW_GAME', payload);
  },
  addProject: async (context, payload) => {
    const projectList = database.ref('projects/');
    const newProject = projectList.push().getKey();
    await newProject.set({
      ...payload,
    });
    context.commit('CREATE_NEW_PROJECT', payload);
  },
};
