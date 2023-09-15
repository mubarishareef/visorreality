import React from 'react'
import { client } from '../../../../visorreality/lib/client'
import {AiFillStar,AiOutlineStar } from 'react-icons/ai'
import { getData } from '@/app/page'
import { Product } from '@/app/components'
import ProductImage from '@/app/components/ProductImage'
import Quantity from '@/app/components/Quantity'
import CartAndBuy from '@/app/components/CartAndBuy'

const ProductDetails = async ({params:{slug}}) => {
    const product= await getProduct(slug)
    const {products}= await getData()
  return (
    <div>
       <div className='product-detail-container'>
         <ProductImage product={product}/>
          <div className='product-detail-desc'>
            <h1>{product[0].name}</h1>
            <div className='reviews'>
              <div>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiOutlineStar/>
              </div>
              <p>(55)</p>
            </div>
            <h4>Details :</h4>
            <p>{product[0].details}</p>
            <p className='price'> ₹ {product[0].price}</p>
            <Quantity slug={slug} product={product[0]}/> 
            <CartAndBuy product={product[0]}/>
          </div>
       </div>
       <div className='maylike-products-wrapper'>
         <h2>You May Also Like</h2>
         <div className='marquee'>
            <div className='maylike-products-container track'>
                {products.map((item)=><Product key={item.id} product={item}/>)}
            </div>
         </div>
       </div>
    </div>
  )
}

async function getProduct(slug){
  const query=`*[_type == 'product' && slug.current == '${slug}']`
  const product = await client.fetch(query)
  return product
}

export default ProductDetails;