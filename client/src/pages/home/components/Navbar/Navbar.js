import React from 'react'
import './Navbar.css'

function Navbar(){
    return(
        <div className='Navbar'>
            <div className='nav_title'>
            <h1>Goh Zheng Ying</h1>
            <div className='powered_by'>
                <h5>Powered By</h5>
                <img src="./images/mern.png"></img>
            </div>
            </div>
        </div>
    )
}

export default Navbar