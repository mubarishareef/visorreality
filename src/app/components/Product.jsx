import Link from 'next/link'
import React from 'react'
import { urlFor } from '../../../visorreality/lib/client'

const Product = ({product}) => {
  // console.log(urlFor(product.image[0]).url());
  return (
    <div>
       <Link href={`/product/${product.slug.current}`}>
         <div className='product-card'>
          <div className='product-image-container'>
            <img src={urlFor(product.image[0]).url()} alt=""
            width={250} height={150} className='product-image'/>
          </div>  
          <p className='product-name'>{product.name}</p>
          <p className='product-price'>₹ {product.price}</p>
         </div>
       </Link>
    </div>
  )
}

export default Product