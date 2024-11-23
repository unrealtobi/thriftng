import { useState } from 'react'
import './App.css'
// import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMyThrift from './components/AboutMyThrift'
import ComingSoonSection from './components/ComingSoonSection'
import FAQs from './components/FAQS'
import Countdown from './components/Countdown'
import Footer from './components/Footer'

function App() {
  
  return (
    <div >
      {/* <Navbar /> */}
      <Hero />
      <AboutMyThrift></AboutMyThrift>
      <ComingSoonSection></ComingSoonSection>
      <FAQs></FAQs>
      <Countdown></Countdown>
      <Footer/>
  
    </div>
  )
}

export default App
