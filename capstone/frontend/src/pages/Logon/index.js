import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import './style.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

function Logon() {
  const [id, setId] = useState('')

  const history = useHistory()

  async function handleLogon(e) {
    e.preventDefault()
    try {
      const response = await api.post('session', { id })
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    } catch (error) {
      console.log(error)
      alert('Error while doing the login. Try again.')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleLogon}>
          <h1>Please login</h1>
          <input placeholder="Your ID"
            value={id}
            onChange={e => setId(e.target.value)} />
          <button className="button" type="submit">Login</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Sign up
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}

export default Logon
