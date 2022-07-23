import React, { useState } from 'react'

function UpdateDish({ dish, restaurants, updateDish }) {
  const [editedDish, setEditedDish] = useState({});

  return (
    <div className="container">
      <div className="card p-5">
        <h2 className='mb-3'>Update: {dish.name}</h2>
        <form className='row g-3'>
          <div className='row-md-6'>
            <input
              type="text"
              name='name'
              className='form-control m-auto'
              placeholder={dish.name}
              onChange={(e) => {
                // setNewName(e.target.value);
                setEditedDish({ ...editedDish, name: e.target.value });
              }} />
          </div>

          <div className='row-md-6'>
            <input
              type="number"
              name='price'
              placeholder={dish.price}
              className='form-control m-auto'
              onChange={(e) => {
                // setNewPrice(e.target.value);
                setEditedDish({ ...editedDish, price: e.target.value });
              }} />
          </div>

          <div className='row-md-6'>
            <input
              type="text"
              name='imageLink'
              placeholder={dish.image_link}
              className='form-control m-auto'
              onChange={(e) => {
                // setNewImageLink(e.target.value);
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
          <div className='my-4'>
            <input className='btn btn-success px-5' type='submit' value='Edit' onClick={(e) => updateDish(dish.id, editedDish, e)} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateDish