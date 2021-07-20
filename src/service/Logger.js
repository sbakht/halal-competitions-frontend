import firebase from "firebase/app";
import { dateRange } from "../utils";

function getTimestamp() {
  return firebase.firestore.Timestamp.now()
}

function getUsername(userid) {
  const usersRef = firebase.firestore().collection('users');
  let username;
  return usersRef.where('userid', '==', userid).get().then((snapshot) => {
    snapshot.forEach(doc => {
      username = doc.data().username;
    })
    return username;
  });
}

export default class LoggerService {

  fetchAll() {
    const { start, end } = dateRange();
    return this.getRef().where('created', '>=', start).where('created', '<', end).get()
  }

  fetchById(userid) {
    const { start, end } = dateRange();
    return this.getRef().where('userid', '==', userid)
      .where('created', '>=', start)
      .where('created', '<', end)
      .limit(1).get()
      .then(({ docs }) => {
        this._setDoc(docs[0]);
        return { docs }
      })
  }

  fetchAllById(userid) {
    return this.getRef().where('userid', '==', userid)
      .get()
      .then(({ docs }) => {
        this._setDoc(docs);
        return { docs }
      })
  }

  save({ state, rootState }) {
    if (this.doc) {
      this.update(state);
    } else if (!this.pendingCreation) {
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
    this.pendingCreation = true;
    getUsername(rootState.User.userid).then((username) => {
      this.getRef().add({
        username,
        userid: rootState.User.userid,
        loggers: state.loggers,
        created: getTimestamp(),
        lastUpdated: getTimestamp(),
      })
        .then(doc => this._setDoc(doc))
        .then(() => this.pendingCreation = false)
    })
  }

  getRef() {
    return firebase.firestore().collection('loggers');
  }

  _setDoc(doc) {
    if (doc) {
      this.doc = doc;
    }
  }
}