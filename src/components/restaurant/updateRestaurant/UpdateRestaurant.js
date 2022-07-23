import React, { useState } from 'react'

function UpdateRestaurant({ selectedRestaurant, updateRestaurant }) {
  const [editedRestaurant, setEditedRestaurant] = useState({});

  return (
    <div className="container">
      <div className="card p-5">
        <h2 className='mb-3'>Update: {selectedRestaurant.title}</h2>
        <form className='row g-3'>
          <div className='row-md-6'>
            <input
              type="text"
              name='title'
              className='form-control m-auto'
              defaultValue={selectedRestaurant.title}
              onChange={(e) => {
                setEditedRestaurant({ ...editedRestaurant, title: e.target.value });
              }} />
          </div>

          <div className='row-md-6'>
            <input
              type="text"
              name='city'
              defaultValue={selectedRestaurant.city}
              className='form-control m-auto'
              onChange={(e) => {
                setEditedRestaurant({ ...editedRestaurant, city: e.target.value });
              }} />
          </div>

          <div className='row-md-6'>
            <input
              type="text"
              name='adress'
              defaultValue={selectedRestaurant.adress}
              className='form-control m-auto'
              onChange={(e) => {
                setEditedRestaurant({ ...editedRestaurant, adress: e.target.value });
              }} />
          </div>
          <div className='row-md-6'>
            <input
              type="text"
              name='workingHours'
              defaultValue={selectedRestaurant.work_hours}
              className='form-control m-auto'
              onChange={(e) => {
                setEditedRestaurant({ ...editedRestaurant, work_hours: e.target.value });
              }} />
          </div>
          <div className='my-4'>
            <input
              className='btn btn-success px-5'
              type='submit' value='Update'
              onClick={(e) => updateRestaurant(selectedRestaurant.id, editedRestaurant, e)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateRestaurant