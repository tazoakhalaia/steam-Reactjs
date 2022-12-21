import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/purchase.css'
import SteamLogo from '../img/logo_steam.svg'
import Bank from '../img/visa.png'
import Bank1 from '../img/paypal.png'
import Bank2 from '../img/discover.png'
import Bank3 from '../img/jcb.png'
import Bank4 from '../img/webmoney.png'
import Bank5 from '../img/americanexpress.png'
import Bank6 from '../img/mastercard.png'

function Purchase() {
  let id = localStorage.getItem('id')
  const[game,setGame] = useState([])
  const[day,setDay] = useState([])
  const[year,setYear] = useState([])
  const[banks,setBanks] = useState([Bank,Bank1,Bank2,Bank3,Bank4,Bank5,Bank6])

  useEffect(() => {
    document.title = "Purchase"

    for(let i = 1; i <= 31; i++){
      setDay(prev => [...prev, i])
    }

    for(let i = 1990; i <= 2026; i++){
      setYear(prev => [...prev, i])
    }

    fetch(`http://localhost:3000/users/${id}`)
  .then(res => res.json())
  .then(data =>{
    setGame(prev => [...prev, data.wishlist[0].gamename, data.wishlist[0].gameprice])
  })
  console.log(game);
  }, [])

  return (
    <div>
      <div className='mains'>
        <div className='purchaseheader'>
          <div  className='paymentinfo'>
            <h1>Purchase Info</h1>
          </div>
          <div className='purchasesteamlogo'>
            <Link to='/profile'><img src={SteamLogo} /></Link>
          </div>
        </div>
        <div className='paymentcontainer'>
          <h1 className='paymentname'>Payment Method</h1>
          <div className='containerleft'>
            <div className='select'>
              <h5 className='pleaseselect'>Please select a payment method</h5>
              <select>
                <option>Visa</option>
                <option>Paypal</option>
                <option>WebMoney</option>
                <option>MasterCard</option>
                <option>American Express</option>
                <option>Discover</option>
                <option>JCR</option>
              </select>
            </div>
            <div className='cardnumber'>
              <h5>Card Number</h5>
              <input type="text" />
            </div>
            <div className='billinginformation'>
              <h1 className='bill'>Billing Information</h1>
              <div className='userdesc'>
                <div className='name'>
                  <h5 className='usernmln'>First Name</h5>
                  <input />
                </div>
                <div className='lastname'>
                <h5 className='usernmln'>Last Name</h5>
                  <input />
                </div>
              </div>
            </div>
            <div className='billingadress'>
            <h5 className='billadress'>Billing Adress</h5>
              <input />
              <h5 className='billadress'>Billing Adress, line 2</h5>
              <input />
            </div>
          </div>
          <div className='containerright'>
            <div className='expirationdate'>
              <div className='day'>
                <h5 className='dateinfo'>Day</h5>
                <select>
                  {day.map((days, index) => {
                    return <option key={index}>{days}</option>
                  })}
                </select>
              </div>
              <div className='year'>
              <h5 className='dateinfo'>Year</h5>
                <select>
                  {year.map((years,index) => {
                    return <option key={index}>{years}</option>
                  })}
                </select>
              </div>
              <div className='securecode'>
              <h5 className='dateinfo'>Secure Code</h5>
                <input />
              </div>
            </div>
            <div className='cityandzipcode'>
              <div className='city'>
                <h5 className='cityname'>City</h5>
                <input />
              </div>
              <div className='zipcode'>
              <h5 className='zpcode'>Zip Code</h5>
                <input />
              </div>
              <div className='phonenumber'>
                <h5 className='nubmer'>Phone Number</h5>
                <input type="number" />
              </div>
              <div className='donepurchase'>
                <button className='paymentdone' disabled>Purchase</button>
              </div>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='banksfoto'>
            {banks.map((bank,index) => {
              return <img key={index} src={bank} />
            })}
            <p>When you submit your payment information your 
              data is protected by Secure Socket Layer (SSL) 
              technology certified by a digital certificate.</p>
          </div>
          <div className='chosengame'>
          {game.map((elements,index) => {
       return <div className='gamedesc'>
        <h5 className='nameprice'>Game Name and Game Price</h5>
         <h1 key={index}>{elements}</h1>
       </div>
    })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Purchase 