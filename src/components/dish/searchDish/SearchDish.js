import React, { useState } from 'react'

function SearchDish({ handleSearch }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <h5>Search dishes by name</h5>
      <form className='d-flex gap-2'>
        <input
          className='form-control'
          type='text'
          placeholder='Enter dish name'
          onChange={(e) => {
            console.log(e.target.value);
            setInputValue(e.target.value);
          }}>
        </input>
        <button
          type='submit'
          className='btn btn-primary btn-sm'
          onClick={(e) => handleSearch(e, inputValue)}
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchDish