'use client'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../../context/StateContext';
import { AiOutlineMinus,AiOutlinePlus } from 'react-icons/ai'
import {BiCommentDetail} from 'react-icons/bi'
import Reviews from './Reviews';
import Message from './Message';


const Quantity = ({slug }) => {
    const [currSlug, setcurrSlug] = useState()
    const [showReview,setShowReview]=useState(false)
    useEffect(()=>setcurrSlug(slug),[])
    const {qty,incQty,decQty,setqty,user,viewMessage,showMessage}=useStateContext();
    if(currSlug!==slug){setqty(1)}
  return (<>
     {showReview && <Reviews setShowReview={setShowReview}/>}
     {showMessage && <Message/>}
     <div className='quantity'>
         <h3>Quantity :</h3>
         <p className='quantity-desc'>
             <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
             <span className='num'>{qty}</span>
             <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
         </p>
         <BiCommentDetail size={30} className='review-button' onClick={()=>{
            if(user){setShowReview(true)}
            else{viewMessage()}
         }}/>
         <p>Reviews (0)</p>
     </div>
    </>
  )
}

export default Quantity