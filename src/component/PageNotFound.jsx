import React from 'react'
import './pageNotFound.css'
import animationData from './Asset/pagenotfound.json'
import Lottie from 'lottie-react'
const PageNotFound = () => {
   
  return (
    <div className='page-not-found'>
    <Lottie  animationData={animationData} />
    </div>
  )
}

export default PageNotFound