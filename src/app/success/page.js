import React from 'react'
import Link from 'next/link';
import Stripe from "stripe";
import Success from '../components/Success';



const stripe=new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const success = async({searchParams}) => {
    if(searchParams.session_id){
    const session = await stripe.checkout.sessions.retrieve(searchParams?.session_id);
    // console.log( session )
    return (
         <Success customer_email={session.customer_email}/>
      )
    }
    else{ 
        return (<div style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
            <h1>Access denied</h1>
            <Link href="/">
              <button type="button" width="300px" className="btn">
                Continue Shopping
              </button>
            </Link>
            </div> )
    }
}    


export default success