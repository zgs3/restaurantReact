import React, { useState } from 'react'

function FilterDish({ restaurants, filterDishes, resetFilter }) {
  const [selectedId, setSelectedId] = useState('');
  const [selectValue, setSelectValue] = useState('Select a restaurant');

  return (
    <div>
      <h5>Filter dishes by restaurant</h5>
      <form className='d-flex gap-2'>
        <select
          value={selectValue}
          className='form-select'
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option disabled >{selectValue}</option>
          {restaurants.map(restaurant => (
            <option key={restaurant.id} value={restaurant.id} >{restaurant.title}</option>
          ))}
        </select>
        <button
          type='submit'
          className='btn btn-primary px-2'
          onClick={(e) => { filterDishes(e, selectedId) }}
        >
          Filter
        </button>
        <button
          className='btn btn-dark px-2'
          onClick={(e) => {
            setSelectValue('Select a restaurant')
            resetFilter()
          }}
        >
          Reset
        </button>
      </form>
    </div>
  )
}

export default FilterDish;