'use client'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useStateContext } from '../../../context/StateContext'
import {TiDeleteOutline} from 'react-icons/ti'

const Message = () => {
  const {googleSignIn,closeMessage}=useStateContext()
  const handleClick=async()=>{
    await googleSignIn()
    closeMessage()
  }
  const handleCancel=()=>{
    closeMessage()
  }
  return (
    <div className='overlay'>
      <div className='popup'>
        <p className='message'>User needs to be authenticated before this functionality ! , Please sign in with your google account</p>
        <div className='buttons'>
           <button className="google-button" onClick={handleClick}>
              <FaGoogle className="google-icon" />
              Sign in
            </button>
            <button className="google-button" onClick={handleCancel}>
              <TiDeleteOutline size={20}/>
              Cancel
            </button>
        </div> 
      </div>
    </div>
  )
}

export default Message