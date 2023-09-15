'use client'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import Message from './Message'

const CartAndBuy = ({product}) => {
    const{qty,onAdd,totalQty,viewMessage,showMessage,user,onCartOpen}=useStateContext()
    // console.log(totalQty);
    const buyNow=async()=>{
      if(user){
        await onAdd(product,qty);
        await onCartOpen()
      }
      else{
        viewMessage()
      }
    }
  return (
    <>
    {showMessage&&<Message/>}
    <div className='buttons'>
      <button className='add-to-cart' onClick={()=>{user?onAdd(product,qty):viewMessage()}}>Add To Cart</button>
      <button className='buy-now' onClick={buyNow}>Buy Now</button>
    </div>
    </>
  )
}

export default CartAndBuy