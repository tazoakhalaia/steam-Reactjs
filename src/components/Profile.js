import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/profile.css"
import SteamLogo from '../img/logo_steam.svg'
import { Link } from 'react-router-dom'
import Steamcard from '../img/steamcard.png'
import Slider1 from '../img/slider1.jpg'
import Slider2 from '../img/slider2.jpg'
import Slider3 from '../img/slider3.jpg'
import Slider4 from '../img/slider4.jpg'
import Slider5 from '../img/slider5.jpg'
import Steamawards from '../img/steam-awards.jpg'
import Games from '../games.json'

function Profile() {
  /////
  const[slider,setSlider] = useState([Slider1,Slider2,Slider3,Slider4,Slider5])
  const[index,setIndex] = useState(0)
  const[disabledmove,setDisablemove] = useState(false)
  const[disableleft,setDisableleft] = useState(true)


  function moveRight(){
      setIndex(index + 1)
      if(index > 0){
          setDisableleft(false)
      }
      if(index === 3){
          setDisablemove(true)
      }
  }

  function moveLeft(){
      if(index === 0){
          setDisablemove(false)
      }
      if(index > 0){
          setIndex(index - 1)
      }
  }
  ////
  const navigate = useNavigate()
  const[username,setUsername] = useState(localStorage.getItem("accountname"))

  function logout(){
    localStorage.removeItem("accountname")
    localStorage.removeItem("password")
    localStorage.removeItem('id')
    navigate('/login')
  } 

  const[games,setGames] = useState([])
  let id = localStorage.getItem('id')

  useEffect(() => {
    document.title = "Welcome To Steam " + localStorage.getItem('accountname')
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
                    <div>
                      <button onClick={logout} className="logout">logout</button>
                   </div> 
                   <h1 className='username1'>UserName:{username}</h1>
                </div>
            </div>
        </header>
        <div className="main">
            <div className='left-main'>
            <div className='steamcard'>
                    <img src={Steamcard} />
                </div>
                <hr></hr>
                <h3 className='gift'>Gift Cards</h3>
                <p className='available'>Now Available on Steam</p>
                <div className='menu'>
                    <ul>
                    <h3 className='left-h3'>Recommended</h3>
                        <li>By Friends</li>
                        <li>By Curators</li>
                        <li>Tags</li>
                    </ul>
                    <ul>
                        <h3 className='left-h3'>Discovery Queues</h3>
                        <li>Recommendations</li>
                        <li>New Releases</li>
                    </ul>
                    <ul>
                    <h3 className='left-h3'>Browse Categories</h3>
                        <li>Top Seller</li>
                        <li>New Releases</li>
                        <li>Upcoming</li>
                        <li>Specials</li>
                        <li>VR Titles</li>
                        <li>Controller-Friendly</li>
                    </ul>
                    <ul>
                    <h3 className='left-h3'>Brow By Genre</h3>
                        <li>Free to Play</li>
                        <li>Early Access</li>
                        <li>Action</li>
                        <li>Adventure</li>
                        <li>Casual</li>
                        <li>Indie</li>
                        <li>Massively Multiplayer</li>
                        <li>Racing</li>
                        <li>RPG</li>
                        <li>Simlation</li>
                        <li>Sports</li>
                        <li>Strategy</li>
                    </ul>
                </div>
            </div>
            <div className='middle-main'>
               <div className='middle-menu'>
                <div className='categories'>
                    <ul>
                    <li><a href='#'>Your Store</a></li>
                    <li><a href='#'>New & Noteworthy</a></li>
                    <li><a href='#'>Categories</a></li>
                    <li><a href='#'>Point Shop</a></li>
                    <li><a href='#'>News</a></li>
                    <li><a href='#'>Labs</a></li>
                    </ul>
                </div>
                <div className='search'>
                    <input type="text" placeholder='search' />
                </div>
               </div>
               <div className='slider'>
                <h1 className='slider-desc'>FEATURED & RECOMMENDED</h1>
               <div className='slider-pic'>
                   <div className='slider-pic-btn'>
                    <button className='moveleft' onClick={moveLeft} disabled={disableleft}>left</button>
                    <button className='moveright' onClick={moveRight} disabled={disabledmove}>right</button>
                </div>
                <img src={slider[index]} />
               </div>
               </div>
               <div className='steam-awards'>
                <img src={Steamawards} />
               </div>
               {
                Games.map((games) => {
                    return <div className='games' key={games.id}>
                        <img className='games-img' src={games.url} />
                        <div className='game-desc'>
                        <h1 className='games-name'>{games.name}</h1>
                        <h1 className='price'>Price: <u>{games.price}</u> $</h1>
                        <p className='desc'>{games.desc}</p>
                        </div>
                        <button className='buy' onClick={() => {
                            fetch(`http://localhost:3000/users/${id}`, {
                                method: "PATCH",
                                headers: {"Content-type" : "application/json"},
                                body: JSON.stringify({
                                    wishlist: [
                                        {
                                             gamename: games.name,
                                             gameurl: games.url,
                                             gameprice: games.price
                                        }
                                    ] 
                                })
                            })
                            .then(res => res.json())
                            .then(data => console.log(data))
                            navigate("/purchase")

                        }}>Buy</button>
                    </div>
                })
               }
            </div>
        </div>
    </div>
  )
}

export default Profile 