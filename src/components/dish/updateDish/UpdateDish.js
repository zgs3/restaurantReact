import React, { useState } from 'react'

function UpdateDish({ dish, restaurants, updateDish }) {
  const [editedDish, setEditedDish] = useState({});

  return (
    <div className="container mb-5">
      <div className="card py-3 px-5">
        <h2 className='mb-3'>Update: {dish.name}</h2>
        <form className='row g-3'>
          <div className='row-md-6'>
            <input
              type="text"
              name='name'
              className='form-control m-auto'
              defaultValue={dish.name}
              onChange={(e) => {
                setEditedDish({ ...editedDish, name: e.target.value });
              }} />
          </div>

          <div className='row-md-6'>
            <input
              type="number"
              name='price'
              defaultValue={dish.price}
              className='form-control m-auto'
              onChange={(e) => {
                setEditedDish({ ...editedDish, price: e.target.value });
              }} />
          </div>

          <div className='row-md-6'>
            <input
              type="text"
              name='imageLink'
              defaultValue={dish.image_link}
              className='form-control m-auto'
              onChange={(e) => {
                setEditedDish({ ...editedDish, image_link: e.target.value });
              }} />
          </div>
          <div className='row-md-6'>

            <select
              className="form-select"
              onChange={(e) => {
                setEditedDish({ ...editedDish, restaurant_id: e.target.value })
              }}>
              <option value={dish.restaurant_id} >{dish.restaurant.title}</option>
              {restaurants.filter(selected => selected.title !== dish.restaurant.title).map(restaurant => (
                <option key={restaurant.id} value={restaurant.id} >{restaurant.title}</option>
              ))}
            </select>
          </div>
          <div className='mt-3'>
            <input className='btn btn-success px-5' type='submit' value='Edit' onClick={(e) => updateDish(dish.id, editedDish, e)} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateDish