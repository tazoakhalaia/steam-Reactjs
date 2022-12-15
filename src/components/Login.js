import React, { useEffect, useState } from 'react'
import '../styles/login.css'
import SteamLogo from '../img/logo_steam.svg'
import LoginBackground from '../img/login_background.jpg'
import QR from '../img/qrcode.png'
import { Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import PC from '../img/pc.png'
import VALVE from '../img/footerLogo_valve_new.png'
import FOOTERSTEAMLOGO from '../img/logo_steam_footer.png'

function Login() {
    useEffect(()=> {
        document.title = "Sign In"
    }, [])


    let navigate = useNavigate()
    
    const[loginName,setloginName] = useState("")
    const[loginpassword,setloginPassword] = useState('')
    const[allow,notallow] = useState(true)

    const { 
        handleSubmit,
     } = useForm()

     let notFind;
     if(allow){
        notFind = null
     }else{
        notFind = <h2 className='notallow'>User not found, try again</h2>
     }

     const onSubmit = (data) => {
        try {
            fetch('http://localhost:3000/users').then(res => res.json())
            .then(data => {
                let find = data.find((user) => {
                    return user.AccountName === loginName && user.Password === loginpassword 
                })
               if(find){
                console.log(find.id);
                notallow(true)
                localStorage.setItem("accountname", loginName)
                localStorage.setItem("password", loginpassword)
                localStorage.setItem('id', find.id)
                navigate('/profile')
               }else{
                notallow(false)
                console.log("not information");
               }
            })
        }catch(error){
            console.log(error);
        }
   }


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
                <button className='loginbtn'>Login </button>
                <Link to='/register'><button className='register'>Register</button></Link>
            </div>
        </div>

    </header>
    <main>
        <div className='loginmainimg'>
            <img src={LoginBackground} />
        </div>
        <div className='signin'>
            <div className='logininputs'>
                <form onSubmit={handleSubmit(onSubmit)}>
            <div className='username'>
                <label className='accountname'>Sign In With Account Name</label>
                <input type='text' onChange={(e) => setloginName(e.target.value)} />
            </div>
            <div className='password'>
            <label>Password</label>
                <input type='password' onChange={(e) => setloginPassword(e.target.value)} />
            </div>
            <div className='rememberme'>
                <label className='labelrememberme'><input type='checkbox'/>Remember me</label>
            </div>
            <div className='signinbtn'>
            <input type="submit" className='submitbtn' value="SIGN IN"></input>
            {notFind}
            <p><u>Help, I can't sign in</u></p>
            </div>
            </form>
            </div>
            <div className='qrcode'>
                <div className='qrimg'>
                    <h2>Or Sign in With</h2>
                    <img src={QR} />
                <p className='mobilesteam'>Use the <u>Steam Mobile</u> App to sign in via QR code</p>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <div className='footertop'>
            <div className='toptext'>
                <p>Join Steam and discover thousands of games to play.</p>
            </div>
            <div className='topimg'>
                <img src={PC} />
            </div>
            <div className='topbtn'>
            <Link to='/register'><button className='join'>Join Steam</button></Link>
                <p>It's free and easy to use.</p>
            </div>
        </div>
        <hr></hr>
        <div className='footermiddle'>
            <div className='middleimg'>
                <img src={VALVE} />
            </div>
            <div className='miidletext'>
                <h2 className='middletextp'>© 2022 Valve Corporation. All rights reserved.
                     All trademarks are property of their respective owners in the 
                     US and other countries.
                     VAT included in all prices where applicable. </h2>
            </div>
            <div className='middlerightimg'>
                <img src={FOOTERSTEAMLOGO} />
            </div>
        </div>
    </footer>
</div>
  )
}

export default Login