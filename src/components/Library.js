import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/library.css'

function Library() {

  let navigate = useNavigate()
    const[gamename,setGamename] = useState("")
    const[gameimage,setGameImage] = useState("")

    let id = localStorage.getItem('id')
    useEffect(() => {
        document.title = "Library Of " + username
        fetch(`http://localhost:3000/users/${id}`)
  .then(res => res.json())
  .then(data =>{
    console.log(data.games[0].gamename);
    setGamename(data.games[0].gamename)
    setGameImage(data.games[0].gameurl)
  })
    },[])
    const[username,setUsername] = useState(localStorage.getItem('accountname'))

  return (
    <div>
        <div className='librarymain'>
            <div className='steamusername'>
                <h1 className='nameofaccout'>{username}</h1>
                <button className='goprofile' onClick={() => {
                  navigate('/profile')
                }}>gg</button>
            </div>
            <div  className='gamelists'>
                    <img className='libraryimage' src={gameimage} />
                    <h1 className='librarygamename'>{gamename}</h1>
                </div>
        </div>
    </div>
  )
}

export default Library