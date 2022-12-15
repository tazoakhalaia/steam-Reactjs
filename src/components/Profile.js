import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Profile() {
  const navigate = useNavigate()

  function logout(){
    localStorage.removeItem("accountname")
    localStorage.removeItem("password")
    localStorage.removeItem('id')
    navigate('/login')
  }

  const[games,setGames] = useState([])
  let id = localStorage.getItem('id')

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`).then(res => res.json())
    .then(data => {
      console.log( data.games[0].name);
      for(let list in data){
        setGames([data.games[0].name , data.games[0].price ])
      }
    })
  }, [])

  return (
    <div style={{color: "red"}}>Profile
    <div>{
        games.map((game,index) => {
         return <h1 key={index}>{game}</h1>
        })
        }
    </div>
    <button onClick={logout}>logout</button>
    </div>
  )
}

export default Profile 