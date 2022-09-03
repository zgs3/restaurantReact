import React, { useState } from 'react'

function UpdateRestaurant({ selectedRestaurant, updateRestaurant, hideUpdateForm }) {
  const [editedRestaurant, setEditedRestaurant] = useState({});

  return (
    <div className="container mb-5">
      <div className="card py-3 px-5">
        <div className='d-flex justify-content-between align-items-center'>
          <h2 className='mb-3'>Update: {selectedRestaurant.title}</h2>
          <button className='btn btn-danger' onClick={() => hideUpdateForm()}>X</button>
        </div>
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
          <div className='mt-3'>
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