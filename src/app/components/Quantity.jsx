'use client'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext';
import { AiOutlineMinus,AiOutlinePlus } from 'react-icons/ai'

const Quantity = ({slug }) => {
    const [currSlug, setcurrSlug] = useState()
    useEffect(()=>setcurrSlug(slug),[])
    const {qty,incQty,decQty,setqty}=useStateContext();
    if(currSlug!==slug){setqty(1)}
  return (
     <div className='quantity'>
         <h3>Quantity :</h3>
         <p className='quantity-desc'>
             <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
             <span className='num'>{qty}</span>
             <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
         </p>
     </div>
  )
}

export default Quantity