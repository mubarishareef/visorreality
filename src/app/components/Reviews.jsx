'use client'
import React, { useState } from 'react'
import { useStateContext } from '../../../context/StateContext'

const Reviews = ({setShowReview,product}) => {
  const [value,setValue]=useState('')
  const {onReviewSubmit,reviews,setReviews}=useStateContext()

  const handleChange=(e)=>{
      setValue(e.target.value)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    await onReviewSubmit(product.name,value)
    setValue('')
  }
    // console.log('review');
  return (
    <div className="overlay" id="popup">
    <div className="popup">
      <div className="popup-header">
        <button id="closePopup" onClick={()=>{
          setReviews([])
          setShowReview(false)
        }}>X</button>
      </div>
      <div className="popup-body">
        <h2>Customer Reviews</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Your Review" value={value} onChange={handleChange}></input>
          <button type="submit">Submit</button>
        </form>
        <div className="reviews-container">
          {reviews.map((review)=>{
            return (
              <div className="review">
                 <span className="customer-name">{review.userName}</span>
                 <p>{review.value}</p>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Reviews