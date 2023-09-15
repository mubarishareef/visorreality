import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe=new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST(NextRequest) {
    const body = await NextRequest.json()
    if (NextRequest.method === 'POST') {
        // console.log(body);
      try {
        const params={
            submit_type:'pay',
            billing_address_collection:'auto', 
            line_items: body.cartItems.map((item)=>{
               return{
                price_data:{
                    currency:'INR',
                    unit_amount:item.price*100,
                    product_data:{
                        name:item.name,
                    },
                },
                quantity:item.quantity,
               }
            }),
            phone_number_collection: {
                enabled: true,
            },
            customer_email:body.user.email,
            shipping_options: [
                { shipping_rate: "shr_1Nq3PGSAKBqeXA81rMBM10oJ" },
                { shipping_rate: "shr_1Nq3R1SAKBqeXA81rieUZryB" },
              ],
            mode: 'payment',
            // success_url: `${NextRequest.headers.get("origin")}/success`,
            success_url: `${NextRequest.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${NextRequest.headers.get("origin")}/?canceled=true`,
          }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);
        // NextResponse.redirect(303, session.url);
        return NextResponse.json({ session });
      } catch (err) {
        // NextResponse.status(err.statusCode || 500).json(err.message);
        console.log(err);
        return NextResponse.json(err.message);
      }
    }
    //  else {
    //   console.log('moonji')
    //   res.setHeader('Allow', 'POST');
    //   res.status(405).end('Method Not Allowed');
    // }
  }