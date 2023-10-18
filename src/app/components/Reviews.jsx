'use client'
import React from 'react'

const Reviews = () => {
    // console.log('review');
  return (
    <div className="popup-container" id="popup">
    <div className="popup-content">
      <div className="popup-header">
        <button id="closePopup">&times;</button>
      </div>
      <div className="popup-body">
        <h2>Customer Reviews</h2>
        <form>
          <input type="text" placeholder="Your Review"></input>
          <button type="submit">Submit</button>
        </form>
        <div className="reviews-container">
          <div className="review">
            <span className="customer-name">Customer 1:</span>
            <p>This is a review from Customer 1. It is a very positive review.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Reviews