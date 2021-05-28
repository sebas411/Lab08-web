import React from 'react'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const App = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
      apiKey: 'AIzaSyBDBrNa3QnY6PRooUNc116XuKZWhtDjB4c',
      authDomain: 'fir-web-lab7.firebaseapp.com',
      projectId: 'fir-web-lab7',
      storageBucket: 'fir-web-lab7.appspot.com',
      messagingSenderId: '408180868794',
      appId: '1:408180868794:web:4a283e670638c7a3f6a483',
      measurementId: 'G-TJXF7E6YVQ',
    }
    firebase.initializeApp(firebaseConfig)
  })

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider).then((response) => console.log(response))
  }
  const showUsers = () => {
    const db = firebase.firestore()
    const usuarios = db.collection('usuarios')
    usuarios.get().then((dbresponses) => {
      dbresponses.forEach((usuario) => console.log(usuario.data()))
    })
  }

  return (
    <div>
      <div>Hola mundo 3</div>
      <button type="button" onClick={login}>login with google</button>
      <button type="button" onClick={showUsers}>Show users</button>
    </div>
  )
}

export default App
