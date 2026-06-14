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
  type DocumentReference,
  type QueryDocumentSnapshot,
} from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { dateRange } from '@/utils'
import type { LoggerMap } from '@/types/firestore'

function getTimestamp() {
  return Timestamp.now()
}

function getUsername(userid: string) {
  if (!db) {
    return Promise.reject(new Error('Firestore not initialized'))
  }

  const q = query(collection(db, 'users'), where('userid', '==', userid))
  let username: string | undefined
  return getDocs(q).then((snapshot) => {
    snapshot.forEach((docSnap) => {
      username = docSnap.data().username as string
    })
    return username
  })
}

interface SavePayload {
  state: { loggers: LoggerMap }
  rootState: { User: { userid: string | null } }
}

interface LoggerState {
  loggers: LoggerMap
}

export default class LoggerService {
  doc: QueryDocumentSnapshot | DocumentReference | undefined
  pendingCreation = false

  fetchAll() {
    if (!db) {
      return Promise.reject(new Error('Firestore not initialized'))
    }

    const { start, end } = dateRange()
    const q = query(
      collection(db, 'loggers'),
      where('created', '>=', start),
      where('created', '<', end),
    )
    return getDocs(q)
  }

  fetchById(userid: string) {
    if (!db) {
      return Promise.reject(new Error('Firestore not initialized'))
    }

    const { start, end } = dateRange()
    const q = query(
      collection(db, 'loggers'),
      where('userid', '==', userid),
      where('created', '>=', start),
      where('created', '<', end),
      limit(1),
    )
    return getDocs(q).then((snapshot) => {
      this._setDoc(snapshot.docs[0])
      return { docs: snapshot.docs }
    })
  }

  fetchAllById(userid: string) {
    if (!db) {
      return Promise.reject(new Error('Firestore not initialized'))
    }

    const q = query(collection(db, 'loggers'), where('userid', '==', userid))
    return getDocs(q).then(snapshot => ({ docs: snapshot.docs }))
  }

  save({ state, rootState }: SavePayload) {
    if (this.doc) {
      this.update(state)
    } else if (!this.pendingCreation) {
      this.create(state, rootState)
    }
  }

  update(state: LoggerState) {
    if (!db || !this.doc || !('id' in this.doc)) {
      return
    }

    updateDoc(doc(db, 'loggers', this.doc.id), {
      loggers: state.loggers,
      lastUpdated: getTimestamp(),
    })
  }

  create(state: LoggerState, rootState: SavePayload['rootState']) {
    if (!db || !rootState.User.userid) {
      return
    }

    this.pendingCreation = true
    getUsername(rootState.User.userid)
      .then((username) => {
        if (!db) {
          return
        }

        addDoc(collection(db, 'loggers'), {
          username,
          userid: rootState.User.userid,
          loggers: state.loggers,
          created: getTimestamp(),
          lastUpdated: getTimestamp(),
        })
          .then(docRef => this._setDoc(docRef))
          .then(() => {
            this.pendingCreation = false
          })
          .catch(() => {
            this.pendingCreation = false
          })
      })
      .catch(() => {
        this.pendingCreation = false
      })
  }

  _setDoc(nextDoc: QueryDocumentSnapshot | DocumentReference | undefined) {
    if (nextDoc) {
      this.doc = nextDoc
    }
  }
}
