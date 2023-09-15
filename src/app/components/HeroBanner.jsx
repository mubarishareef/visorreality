import React from 'react'
import Link from 'next/link'
import { urlFor } from '../../../visorreality/lib/client'

const HeroBanner = ({banner}) => {
  // console.log(urlFor(banner[0].image).url());
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'>{banner[0].smallText}</p>
            <h3>{banner[0].mediumText}</h3>
            <h1>{banner[0].largeText}</h1>
            <img src={urlFor(banner[0].image).url()} alt="VR headset" className='hero-banner-image' />
            <div>
                <Link href={`/product/${banner[0].slug.current}`}>
                  <button>{banner[0].buttonText}</button>
                </Link>
                <div className='desc'>
                   <h5>Description</h5> 
                   <p>{banner[0].description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner