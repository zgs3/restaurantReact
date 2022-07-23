import React, { useState } from 'react'

function CreateDish({ createDish, restaurants }) {
  const [newDish, setNewDish] = useState({});
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [selectValue, setSelectValue] = useState('Select a restaurant');


  return (
    <div className="container">
      <div className="card p-5">
        <h2 className='mb-3'>Add new dish</h2>
        <form className='row g-3'>
          <div className='row-md-6'>
            <input
              type="text"
              name='title'
              className='form-control m-auto'
              placeholder='Name'
              value={dishName}
              onChange={(e) => {
                setDishName(e.target.value);
                setNewDish({ ...newDish, name: e.target.value });
              }} />
          </div>
          <div className='row-md-6'>
            <input
              type="number"
              name='price'
              placeholder='Price in Euros'
              className='form-control m-auto'
              value={dishPrice}
              onChange={(e) => {
                setDishPrice(e.target.value);
                setNewDish({ ...newDish, price: e.target.value });
              }} />
          </div>
          <div className='row-md-6'>
            <input
              type="text"
              name='imageLink'
              placeholder='Image link'
              className='form-control m-auto'
              value={imageLink}
              onChange={(e) => {
                setImageLink(e.target.value);
                setNewDish({ ...newDish, image_link: e.target.value });
              }} />
          </div>
          <div className='row-md-6'>
            <select
              value={selectValue}
              className='form-select'
              onChange={(e) => {
                setSelectValue(e.target.value)
                setNewDish({ ...newDish, restaurant_id: e.target.value });
              }}>
              <option disabled >Select a restaurant</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>{restaurant.title}</option>
              ))}
            </select>
          </div>
          <div className='my-4'>
            <input
              className='btn btn-success px-5'
              type='submit' value='Add'
              onClick={(e) => {
                setSelectValue('Select a restaurant');
                setDishName('');
                setDishPrice('');
                setImageLink('');
                createDish(e, newDish)
              }} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateDish