import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import App from './App'

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

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)
