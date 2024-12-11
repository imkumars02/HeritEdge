import React from 'react'
import './KumbhNavBar.scss'
import logo from '../Images/logo.png'
import { Link } from 'react-router-dom'

const KumbhNavBar = () => {
  return (
    <div className='KumbhNavBar'>
        <div className='Logo'>
            <img src={logo} alt='Logo'/>
        </div>
        <div className='NavBar'>
            <ul>
                <li><Link to={'/KumbhPage'}>Home</Link></li>
                <li><Link to={''}>About Kumbh</Link></li>
                <li><Link to="/Map">Map</Link></li>
                <li><Link to={'/HeritEdgeDiary'}>Herit Diary</Link></li>
                <li><Link to={'/Gallery'}>Nashik Diary</Link></li>
                <li><Link to={'/VolunteerRegistration'}>Register Volunteer</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default KumbhNavBar