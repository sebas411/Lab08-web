import React from 'react'
import firebase from 'firebase/app'

import 'firebase/auth'

const App = () => {
  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then((response) => console.log(response))
  }
  return (
    <div>
      <div>Hola mundo 3</div>
      <button type="button" onClick={login}>login with google</button>
    </div>
  )
}

export default App
