import React, { useState } from 'react'

function RateForm({ dishId, addRating }) {
  const [rating, setRating] = useState('');

  return (
    <form>
      <div className='d-flex'>
        <select defaultValue='Choose rating' className="form-select form-select-sm me-1" onChange={(e) => setRating(e.target.value)}>
          <option disabled>Choose rating</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
        <input className='btn btn-sm btn-success' type='submit' value='Rate!' onClick={(e) => addRating(dishId, rating, e)} />
      </div>
    </form>
  )
}

export default RateForm