import { Navbar } from './components'
import Footer from './components/Footer'
import './globals.css'
import { Inter } from 'next/font/google'
import { getData } from './page'
import { StateContext } from '../../context/StateContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'visor.reality',
  description: 'Where Vision Meets Reality',
}

export default async function RootLayout({ children }) {
  const {logo}=await getData()
  // console.log(logo)
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
           <Toaster/>
           <header>
             <Navbar logo={logo[0]}/>
           </header>
           <main className='main-container'>
              {children}
           </main>
           <footer>
             <Footer/>
           </footer>
        </StateContext>
      </body>
    </html>
  )
}

