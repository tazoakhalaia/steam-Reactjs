import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import SteamLogo from '../img/logo_steam.svg'
import '../styles/register.css'
import {  useEffect  } from 'react'

function Register() {
  const[country,setCountry] = useState(["Georgia"])
  const[accountName,setAccountName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[countryValue,setCountryValue] = useState('')
  const[disable,setDisable] = useState(false)

  function sendRequest() {
    fetch('http://localhost:3000/users', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      AccountName: accountName ,
                      Password: password,
                      Email: email,
                      Country: countryValue,
                      wishlist: [],
                      games: []
                  })
              }).then(res => res.json()).then(data => {
                console.log(data);
              })
  }

  useEffect(() => {
    const countryList = async() => {
      await fetch('https://countriesnow.space/api/v0.1/countries')
      .then(res => res.json().then(data => {
       for(let i = 0; i < data.data.length; i++){
        setCountry(oldarray => [...oldarray, data.data[i].country])
       }
      }))
    }
    countryList()

  }, [])

  return (
    <div>
       <header>
        <div className='header-container'>
            <div className='navbar'>
                <div className='navimg'>
                    <Link to='/'><img src={SteamLogo} /></Link>
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
            </div>
        </div>
        </header>
        <main>
          <div className='middle'>
            <h1>Create Your Account</h1>
            <div className='inputs'>
              <input type="text" 
              placeholder='Account Name' 
              onChange={(e) => setAccountName(e.target.value)} 
              />
            </div>
            <div className='inputs'>
              <input type="text" 
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value) }
               />
            </div>
            <div className='inputs'>
              <input type="password" 
              placeholder='Password' 
              onChange={(e) => setPassword(e.target.value) }
              />
            </div>
            <div className='inputs'>
              <select onChange={(e) => setCountryValue(e.target.value)}>
                {country.map((countries,index) => {
                  return <option key={index} >
                    {countries}
                    </option>
                })}
              </select>
               </div>
               <div className='notrobot'>
              <input  type='checkbox' value="I am not Robot" /><label>I am not Robot</label>
              </div>
              <div className='age'>
                <input type='checkbox' /><label>
												I am 13 years of age or older and agree to the terms of the </label>
              </div>
              <div className='registerbtn'>
                <input type='submit' value='Register' disabled={disable} onClick={sendRequest} />
              </div>
          </div>
        </main>
    </div>
  )
}

export default Register