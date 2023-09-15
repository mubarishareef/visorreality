'use client'
import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation'
import { useStateContext } from '../../../context/StateContext';

const Success = ({customer_email}) => {
    const router=useRouter()
    const {onSuccessPayment,user}=useStateContext()
    useEffect(()=>{
        const emptyCart=async()=>{
            await  onSuccessPayment();
         }
         emptyCart()
    },[user])

    return (
        <div className="success-wrapper">
          <div className="success">
            <p className="icon">
              <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email inbox for the receipt. 
            <a className="email" href={`mailto:${customer_email}`}>
              {customer_email}
              </a></p>
            <p className="description">
              If you have any questions, please email
              <a className="email" href="mailto:order@example.com">
                order@example.com
              </a>
            </p>    
              <button type="button" width="300px" className="btn" onClick={()=>router.replace('/')}>
              {/* onClick={emptyCart} */}
                Continue Shopping
              </button>
          </div>
        </div>
      )
}

export default Success