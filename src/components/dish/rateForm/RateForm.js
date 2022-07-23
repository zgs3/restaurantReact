import React, { useState } from 'react'

function RateForm({ dishId, addRating }) {
  const [rating, setRating] = useState('');

  return (
    <form>
      <div className='d-flex'>
        <select className="form-select form-select-sm" onChange={(e) => setRating(e.target.value)}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <input className='btn btn-success' type='submit' value='Rate!' onClick={(e) => addRating(dishId, rating, e)} />
      </div>
    </form>
  )
}

export default RateForm