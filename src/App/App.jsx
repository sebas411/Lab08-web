import React from 'react'
import firebase from 'firebase/app'

import 'firebase/firestore'
import './App.css'

window.asisting = {}

const App = () => {
  const [activePage, setActivePage] = React.useState('Home')
  const [contenedorClases, setContenedorClases] = React.useState([])
  const [contenedorUsuarios, setContenedorUsuarios] = React.useState([])

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
    window.db = firebase.firestore()
  })

  const getTodayDate = () => {
    let yourDate = new Date()
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
    return yourDate.toISOString().split('T')[0]
  }

  const pastAssist = () => {
    const clases = window.db.collection('clases')
    clases.get().then((respuesta) => {
      const contain = []
      respuesta.forEach((clase, index) => {
        contain.push(
          <option key={index} value={clase.data().fecha}>{clase.data().nombre}</option>,
        )
      })
      setContenedorClases(contain)
    })
    setContenedorUsuarios([])
    setActivePage('pasada')
  }

  const seleccionarClase = () => {
    const select = document.getElementById('clases')
    window.searchDate = select.value
    const usuarios = window.db.collection('usuarios')
    usuarios.get().then((respuesta) => {
      const contain = []
      contain.push(
        <div style={{ fontWeight: 'bold' }}>
          Fecha:
          <span>{window.searchDate}</span>
        </div>,
      )
      respuesta.forEach((usuario, index) => {
        contain.push(
          <div key={index}>
            {usuario.data().nombre}
            <span>{usuario.data().asistencias[window.searchDate] ? '✓' : '✗'}</span>
          </div>,
        )
      })
      setContenedorUsuarios(contain)
    })
  }

  const newClass = () => {
    setContenedorUsuarios([])
    const usuarios = window.db.collection('usuarios')
    usuarios.get().then((respuesta) => {
      const contain = []
      respuesta.forEach((usuario, index) => {
        const userID = usuario.id
        const { nombre } = usuario.data()
        window.asisting[userID] = false
        contain.push(
          <div key={index}>
            {`${nombre}  `}
            <input
              type="checkbox"
              className="check"
              onClick={() => {
                window.asisting[userID] = !window.asisting[userID]
              }}
            />
          </div>,
        )
      })
      setContenedorUsuarios(contain)
    })
    setActivePage('nuevo')
  }

  const regreso = () => {
    setActivePage('Home')
  }

  const guardarAsistencia = () => {
    const nombre = document.getElementById('name').value
    const fecha = document.getElementById('date').value
    const usuarios = window.db.collection('usuarios')
    const clases = window.db.collection('clases')

    clases.add({
      nombre,
      fecha,
    })
    Object.entries(window.asisting).forEach((asistencia) => {
      usuarios.doc(asistencia[0]).get().then((usuario) => {
        const map = usuario.data().asistencias
        // eslint-disable-next-line prefer-destructuring
        map[fecha] = asistencia[1]
        usuarios.doc(asistencia[0]).update({ asistencias: map })
      })
    })
    setActivePage('Home')
  }

  const newStudent = () => {
    setActivePage('usuario')
  }

  return (
    <div>
      <div className="main" style={{ display: activePage === 'Home' ? 'flex' : 'none' }}>
        <h1>Toma de asistencias</h1>
        <button type="button" onClick={pastAssist}>Ver asistencia de clases pasadas</button>
        <button type="button" onClick={newClass}>Nueva clase</button>
        <button type="button" onClick={newStudent}>Agregar alumno</button>
      </div>
      <div className="main" style={{ display: activePage === 'pasada' ? 'flex' : 'none' }}>
        <h2>Vista de asistencias pasadas</h2>
        <div>
          <select name="clases" id="clases">{ contenedorClases }</select>
          <button type="button" onClick={seleccionarClase}>Seleccionar clase</button>
          <div className="contenedor">{contenedorUsuarios}</div>
        </div>
        <button type="button" onClick={regreso}>Regresar</button>
      </div>
      <div className="main" style={{ display: activePage === 'nuevo' ? 'flex' : 'none' }}>
        <h2>Asistencia de nueva clase</h2>
        <label htmlFor="date">
          Fecha
          <input type="date" id="date" defaultValue={getTodayDate()} />
        </label>
        <label htmlFor="name">
          Nombre clase
          <input type="text" id="name" />
        </label>
        <h3>Alumnos</h3>
        <div className="contenedor">{contenedorUsuarios}</div>
        <button type="button" onClick={guardarAsistencia}>Guardar asistencia</button>
        <button type="button" onClick={regreso}>Regresar</button>
      </div>
      <div className="main" style={{ display: activePage === 'usuario' ? 'flex' : 'none' }}>
        <h2>Agregar alumno</h2>
        <label htmlFor="studentName">
          Nombre
          <input type="text" id="studentName" />
        </label>
        <label htmlFor="carnet">
          Carné
          <input type="text" id="carnet" />
        </label>
        <button
          type="button"
          onClick={() => {
            const usuarios = window.db.collection('usuarios')
            const nombre = document.getElementById('studentName').value
            const carnet = document.getElementById('carnet').value
            usuarios.doc(carnet).set({ nombre, asistencias: {} })
            setActivePage('Home')
          }}
        >
          Ingresar
        </button>
        <button type="button" onClick={regreso}>Regresar</button>
      </div>
    </div>
  )
}

export default App
