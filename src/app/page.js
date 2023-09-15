import { client } from "../../visorreality/lib/client"
import { HeroBanner,FooterBanner, Product } from "./components"


export default async function Home() {
   const {products,banner,footerBanner}=await getData()
  return (
    <>
     <HeroBanner banner={banner}/>
     <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>VR Headsets of many variation</p>
     </div>
     <div className="products-container">
        {products.map((product)=><Product key={product._id} product={product}/>)}
     </div>
     <FooterBanner footerBanner={footerBanner[0]}/>
    </>
  )
}

export async function getData(){
   const productQuery=`*[_type == 'product']`
   const products=await client.fetch(productQuery)

   const bannerQuery=`*[_type == 'banner']`
   const banner=await client.fetch(bannerQuery)

   const footerBannerQuery=`*[_type == 'footerBanner']`
   const footerBanner=await client.fetch(footerBannerQuery)

   const logoQuery=`*[_type == 'logo']`
   const logo=await client.fetch(logoQuery)

   return {products,banner,footerBanner,logo}
}

