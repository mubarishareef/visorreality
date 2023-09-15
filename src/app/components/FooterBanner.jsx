import Link from 'next/link'
import React from 'react'
import { urlFor } from '../../../visorreality/lib/client'

const FooterBanner = ({footerBanner:{discount,largeText1,largeText2,saleTime,smallText,mediumText,buttonText,slug,image,description}}) => {
  return (
    <div className='footer-banner-container'>
        <div className='banner-desc'>
            <div className='left'>
               <p>{discount}</p>
               <h3>{largeText1}</h3>
               <h3>{largeText2}</h3>
               <p>{saleTime}</p>
            </div>
            <div className='right'>
               <p>{smallText}</p>
               <h3>{mediumText}</h3>
               <p>{description}</p>
               <Link href={`/product/${slug.current}`}>
                  <button>{buttonText}</button> 
               </Link>
               <img src={urlFor(image).url()} alt="" className='footer-banner-image'/>
            </div>
        </div> 
    </div>
  )
}

export default FooterBanner