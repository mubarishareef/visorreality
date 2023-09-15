'use client'
import React from 'react'
import { useStateContext } from '../../../context/StateContext'
import { AiOutlineLeft, AiOutlineShopping,AiOutlineMinus,AiOutlinePlus } from 'react-icons/ai'
import Link from 'next/link'
import { urlFor } from '../../../visorreality/lib/client'
import {TiDeleteOutline} from 'react-icons/ti'
import getStripe from '../../../lib/getStripe'
import toast from 'react-hot-toast'


const Cart = () => {
  const {price,totalQty,cartItems,setshowCart,removeCartItem,incCartProductQty,decCartProductQty,user}=useStateContext()
  const handleCheckOut=async()=>{
     const stripe=await getStripe();

     const response=await fetch('/api/stripe_session',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({cartItems:cartItems,user:user})
     })
     if(response.statusCode===500)return;
     const data=await response.json()
    //  console.log(data);
     toast.loading('Redirecting...')
    //  stripe?.redirectToCheckout({sessionId:data.id})
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  }
  // console.log(cartItems);
  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button className='cart-heading' onClick={()=>setshowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQty} items)</span>
        </button>
        {totalQty<1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Your Shopping Cart Is Empty</h3>
            <Link href='/'>
              <button className='btn' onClick={()=>setshowCart(false)}>Continue Shopping</button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          { cartItems.map((item)=>(
            <div className='product' key={item._id}>
              <img src={urlFor(item.image[0]).url()} alt="" className='cart-product-image' />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>₹ {item.price}</h4>
                </div>
                  <Link href={`/product/${item.slug.current}`}>
                    <div className='view-product-container'>
                     <p  className='view-product' onClick={()=>setshowCart(false)}>View Product</p>
                    </div> 
                  </Link> 
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={()=>decCartProductQty(item)} ><AiOutlineMinus/></span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus' onClick={()=>incCartProductQty(item)}><AiOutlinePlus/></span>
                    </p>         
                  </div>
                  <button className='remove-item' onClick={()=>removeCartItem(item)}>
                    <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalQty>=1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal :</h3>
              <h3>₹ {price}</h3>
            </div>
            <div className='btn-container'>
              <button className='btn' onClick={handleCheckOut}>Proceed To Payment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart