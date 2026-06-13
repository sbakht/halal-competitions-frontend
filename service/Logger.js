import {
  collection,
  query,
  where,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { dateRange } from '../utils'

function getTimestamp() {
  return Timestamp.now()
}

function getUsername(userid) {
  const q = query(collection(db, 'users'), where('userid', '==', userid))
  let username
  return getDocs(q).then((snapshot) => {
    snapshot.forEach(docSnap => {
      username = docSnap.data().username
    })
    return username
  })
}

export default class LoggerService {

  fetchAll() {
    const { start, end } = dateRange()
    const q = query(
      collection(db, 'loggers'),
      where('created', '>=', start),
      where('created', '<', end),
    )
    return getDocs(q)
  }

  fetchById(userid) {
    const { start, end } = dateRange()
    const q = query(
      collection(db, 'loggers'),
      where('userid', '==', userid),
      where('created', '>=', start),
      where('created', '<', end),
      limit(1),
    )
    return getDocs(q)
      .then((snapshot) => {
        this._setDoc(snapshot.docs[0])
        return { docs: snapshot.docs }
      })
  }

  fetchAllById(userid) {
    const q = query(collection(db, 'loggers'), where('userid', '==', userid))
    return getDocs(q)
      .then((snapshot) => {
        this._setDoc(snapshot.docs)
        return { docs: snapshot.docs }
      })
  }

  save({ state, rootState }) {
    if (this.doc) {
      this.update(state)
    } else if (!this.pendingCreation) {
      this.create(state, rootState)
    }
  }

  update(state) {
    updateDoc(doc(db, 'loggers', this.doc.id), {
      loggers: state.loggers,
      lastUpdated: getTimestamp(),
    })
  }

  create(state, rootState) {
    this.pendingCreation = true
    getUsername(rootState.User.userid).then((username) => {
      addDoc(collection(db, 'loggers'), {
        username,
        userid: rootState.User.userid,
        loggers: state.loggers,
        created: getTimestamp(),
        lastUpdated: getTimestamp(),
      })
        .then(docRef => this._setDoc(docRef))
        .then(() => this.pendingCreation = false)
        .catch(() => this.pendingCreation = false)
    }).catch(() => this.pendingCreation = false)
  }

  _setDoc(doc) {
    if (doc) {
      this.doc = doc
    }
  }
}
