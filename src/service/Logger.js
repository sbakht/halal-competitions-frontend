import firebase from "firebase/app";

function getTimestamp() {
  return firebase.firestore.Timestamp.now()
}

export default class LoggerService {
  constructor() {

  }

  setDoc(doc) {
    if(doc) {
      this.doc = doc;
    }
  }

  save({state, rootState}) {
    if(this.doc) {
      this.update(state);
    }else{
      this.create(state, rootState);
    }
  }

  update(state) {
    this.getRef().doc(this.doc.id).update({
      loggers: state.loggers, 
      lastUpdated: getTimestamp(),
    })
  }

  create(state, rootState) {
    return this.getRef().add({
      username: rootState.User.username,
      userid: rootState.User.userid,
      loggers: state.loggers,
      created: getTimestamp(),
      lastUpdated: getTimestamp(),
    })
    .then(doc => this.setDoc(doc));
  }

  getRef() {
    return firebase.firestore().collection('loggers');
  }
}