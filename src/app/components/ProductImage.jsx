'use client'

import React, { useState } from 'react'
import { urlFor } from '../../../visorreality/lib/client'

const ProductImage = ({product}) => {
  const [index,setIndex]=useState(0)
  return (
    <div>
      <div className='image-container'>
         <img src={urlFor(product[0].image[index]).url()} alt=''/>
      </div>
      <div className='main-container-image-small'>
        {product[0].image.map((image,i)=><div key={i} className='small-image-container'
        onMouseEnter={()=>setIndex(i)} onTouchStart={()=>setIndex(i)}><img src={urlFor(image).url()}/></div>)}
         </div>
    </div>
  )
}

export default ProductImage