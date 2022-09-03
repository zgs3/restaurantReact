import React, { useState } from 'react'

function CreateRestaurant({ createRestaurant, hideCreateForm }) {
  const [newRestaurant, setNewRestaurant] = useState({});
  const [restaurantTitle, setRestaurantTitle] = useState('');
  const [restaurantCity, setRestaurantCity] = useState('');
  const [restaurantAdress, setRestaurantAdress] = useState('');
  const [restaurantWorkHours, setRestaurantWorkHours] = useState('');

  return (
    <div>
      <div className="container mb-5">
        <div className="card py-3 px-5">
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className='mb-3'>Add new restaurant</h2>
            <button className='btn btn-danger' onClick={() => hideCreateForm()}>X</button>
          </div>
          <form className='row g-3'>
            <div className='row-md-6'>
              <input
                type="text"
                name='title'
                className='form-control m-auto'
                placeholder='Title'
                value={restaurantTitle}
                onChange={(e) => {
                  setRestaurantTitle(e.target.value)
                  setNewRestaurant({ ...newRestaurant, title: e.target.value });
                }} />
            </div>
            <div className='row-md-6'>
              <input
                type="text"
                name='city'
                placeholder='City'
                className='form-control m-auto'
                value={restaurantCity}
                onChange={(e) => {
                  setRestaurantCity(e.target.value)
                  setNewRestaurant({ ...newRestaurant, city: e.target.value });
                }} />
            </div>
            <div className='row-md-6'>
              <input
                type="text"
                name='adress'
                placeholder='Adress'
                className='form-control m-auto'
                value={restaurantAdress}
                onChange={(e) => {
                  setRestaurantAdress(e.target.value)
                  setNewRestaurant({ ...newRestaurant, adress: e.target.value });
                }} />
            </div>
            <div className='row-md-6'>
              <input
                type="text"
                name='workHours'
                placeholder='Working hours'
                className='form-control m-auto'
                value={restaurantWorkHours}
                onChange={(e) => {
                  setRestaurantWorkHours(e.target.value)
                  setNewRestaurant({ ...newRestaurant, work_hours: e.target.value });
                }} />
            </div>
            <div className='mt-3'>
              <input
                className='btn btn-success px-5'
                type='submit' value='Add'
                onClick={(e) => {
                  setRestaurantTitle('');
                  setRestaurantCity('');
                  setRestaurantAdress('');
                  setRestaurantWorkHours('');
                  createRestaurant(e, newRestaurant)
                }} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRestaurant;