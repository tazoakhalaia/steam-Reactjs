import React, { useEffect, useState } from 'react'
import '../styles/home.css'
import SteamLogo from '../img/logo_steam.svg'
import { Link } from 'react-router-dom'

export default function Home() {
    useEffect(() => {
        document.title = "Welcome to Steam"
    }, [])

  return (
    <div>
        <header>
            <div className='header-container'>
                <div className='navbar'>
                    <div className='navimg'>
                        <img src={SteamLogo} />
                    </div>
                    <div className='navmenu'>
                        <ul>
                            <li><a href='#'>Store</a></li>
                            <li><a href='#'>Community</a></li>
                            <li><a href='#'>About</a></li>
                            <li><a href='#'>Support</a></li>
                        </ul>
                    </div>
                </div>
                <div className='header-right'>
                    <div className='installsteam'>
                        <button>Install Steam</button>
                    </div>
                    <Link to='/login'><button className='loginbtn'>Login </button></Link>
                    <Link to='/register'><button className='register'>Register</button></Link>
                </div>
            </div>

        </header>
    </div>
  )
}
