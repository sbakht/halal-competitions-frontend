import firebase from "firebase/app";
import { dateRange } from "../utils";

function getTimestamp() {
  return firebase.firestore.Timestamp.now()
}

export default class LoggerService {

  fetch(userid) {
    const {start, end} = dateRange();
    return this.getRef().where('userid', '==', userid)
                    .where('created', '>=', start)
                    .where('created', '<', end)
                    .limit(1).get()
                    .then(({docs}) => {
      this._setDoc(docs[0]);
      return {docs}
    })
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
    this.getRef().add({
      username: rootState.User.username,
      userid: rootState.User.userid,
      loggers: state.loggers,
      created: getTimestamp(),
      lastUpdated: getTimestamp(),
    })
    .then(doc => this._setDoc(doc));
  }

  getRef() {
    return firebase.firestore().collection('loggers');
  }

  _setDoc(doc) {
    if(doc) {
      this.doc = doc;
    }
  }
}