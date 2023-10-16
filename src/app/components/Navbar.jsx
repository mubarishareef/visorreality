'use client'
import Link from 'next/link'
import React from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import { urlFor } from '../../../visorreality/lib/client'
import { useStateContext } from '../../../context/StateContext'
import { Cart } from '.'
import { FaGoogle } from 'react-icons/fa';
import Message from './Message'
import toast from 'react-hot-toast'


const Navbar = ({logo}) => {
  const {totalQty,showCart,setshowCart,viewMessage,showMessage,googleSignIn,user,googleSignOut,onCartOpen}=useStateContext()
  // console.log(user);
  const handleClick=async()=>{
    if(user){
      await googleSignOut()
      toast.success(`You have been succesfully signed out`)
    }
    else{
      await googleSignIn()
    }
  }
  return (
    <>
    {showMessage&&<Message/>}
    <div className='navbar-container'>
      <Link href='/'>
        <img src={urlFor(logo.image).url()} alt=""  className='logo'/>
      </Link>
      <div className='nav-right'>
         {user && <img className='user-image' src={user.photoURL}/>}
         <button className="google-button" onClick={handleClick}>
           <FaGoogle className="google-icon" />
           {user? 'Sign out':'Sign in'}
         </button>
         <button className='cart-icon' onClick={()=>{{user? onCartOpen():viewMessage()}}}>
           <AiOutlineShopping/>
           <span className='cart-item-qty'>{totalQty}</span>
         </button>
      </div>
      {showCart && user&& <Cart/>}
    </div>
  </> 
  )
}

export default Navbar