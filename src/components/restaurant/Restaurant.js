import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import React, { useState, useEffect } from 'react';

function Restaurant() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [restaurants, setRestaurants] = useState([]);
  const [sortOrder, setSordOrder] = useState();
  const [restaurant, setRestaurant] = useState([]);

  // ALL RESTAURANTS
  const [newRestaurant, setNewRestaurant] = useState({});
  const [restaurantTitle, setRestaurantTitle] = useState('');
  const [restaurantCity, setRestaurantCity] = useState('');
  const [restaurantAdress, setRestaurantAdress] = useState('');
  const [restaurantWorkHours, setRestaurantWorkHours] = useState('');

  // RESTAURANT TO EDIT
  const [newTitle, setNewTitle] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newAdress, setNewAdress] = useState('');
  const [newWorkHours, setNewWorkHours] = useState('');
  const [editedRestaurant, setEditedRestaurant] = useState({});

  const [showDiv, setShowDiv] = useState(false);

  function deleteRestaurant(id) {
    fetch("http://127.0.0.1:8000/api/v1/restaurants/" + id, { method: 'DELETE' })
      .then((response) => {
        if (response.status === 200) {
          const remaining = restaurants.filter(item => id !== item.id)
          setRestaurants(remaining)
        }
      });
  }

  function addRestaurant(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/restaurants", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRestaurant)
    })
      .then((response) => {
        if (response.status === 201) {
          setRestaurantTitle('');
          setRestaurantCity('');
          setRestaurantAdress('');
          setRestaurantWorkHours('');
          fetch("http://127.0.0.1:8000/api/v1/restaurants")
            .then(res => res.json())
            .then(
              (result) => {
                setRestaurants(result);
              })
        }
      })
  }

  function updateRestaurant(id, e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/restaurants/" + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedRestaurant)
    })
      .then((response) => {
        if (response.status === 200) {
          fetch("http://127.0.0.1:8000/api/v1/restaurants")
            .then(res => res.json())
            .then(
              (result) => {
                setRestaurants(result);
                setShowDiv(!showDiv);
              })
        }
      })
  }

  function showEdit(id) {
    setShowDiv(!showDiv);
    fetch("http://127.0.0.1:8000/api/v1/restaurants/" + id)
      .then(res => res.json())
      .then(
        (result) => {
          setRestaurant(result[0]);
        })
  }

  if (sortOrder === true) {
    sortAscending();
  } else if (sortOrder === false) {
    sortDescending();
  }

  function sortAscending() {
    const list = restaurants;
    list.sort((a, b) => {
      let first = a.title.toLowerCase(),
        second = b.title.toLowerCase();
      if (first < second) {
        return -1;
      }
      if (first > second) {
        return 1;
      }
      return 0;
    });
  }

  function sortDescending() {
    const list = restaurants;
    list.sort((a, b) => {
      let first = a.title.toLowerCase(),
        second = b.title.toLowerCase();
      if (first > second) {
        return -1;
      }
      if (first < second) {
        return 1;
      }
      return 0;
    });
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/restaurants")
      .then(res => res.json())
      .then(
        (result) => {
          setRestaurants(result);
          setIsLoaded(true);
        },
        (error) => { setError(error); setIsLoaded(true); })
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="container">
          <table className="table table-striped table-hover">
            <thead>
              <tr className='fs-4'>
                <th>
                  Title
                  <button
                    className='btn btn-outline-dark p-1 mx-2'
                    onClick={() => setSordOrder(!sortOrder)}>
                    Sort
                  </button>
                </th>
                <th>City</th>
                <th>Adress</th>
                <th>Working hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map(restaurant => (
                <tr key={restaurant.id}>
                  <td>{restaurant.title}</td>
                  <td>{restaurant.city}</td>
                  <td>{restaurant.adress}</td>
                  <td>{restaurant.work_hours}</td>
                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={(e) => deleteRestaurant(restaurant.id)}>
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        showEdit(restaurant.id)
                      }}>
                      Update
                    </button>
                  </td>
                </tr>)
              )}
            </tbody>
          </table>
        </div >

        <div className='container'>
          {(showDiv)
            ?
            <div className="container">
              <div className="card p-5">
                <h2 className='mb-3'>Update: {restaurant.title}</h2>
                <form className='row g-3'>
                  <div className='row-md-6'>
                    <input
                      type="text"
                      name='title'
                      className='form-control m-auto'
                      placeholder={restaurant.title}
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                        setEditedRestaurant({ ...editedRestaurant, title: e.target.value });
                      }} />
                  </div>

                  <div className='row-md-6'>
                    <input
                      type="text"
                      name='city'
                      placeholder={restaurant.city}
                      className='form-control m-auto'
                      onChange={(e) => {
                        setNewCity(e.target.value);
                        setEditedRestaurant({ ...editedRestaurant, city: e.target.value });
                      }} />
                  </div>

                  <div className='row-md-6'>
                    <input
                      type="text"
                      name='adress'
                      placeholder={restaurant.adress}
                      className='form-control m-auto'
                      onChange={(e) => {
                        setNewAdress(e.target.value);
                        setEditedRestaurant({ ...editedRestaurant, adress: e.target.value });
                      }} />
                  </div>
                  <div className='row-md-6'>
                    <input
                      type="text"
                      name='workingHours'
                      placeholder={restaurant.work_hours}
                      className='form-control m-auto'
                      onChange={(e) => {
                        setNewWorkHours(e.target.value);
                        setEditedRestaurant({ ...editedRestaurant, work_hours: e.target.value });
                      }} />
                  </div>

                  <div className='my-4'>
                    <input className='btn btn-success px-5' type='submit' value='Update' onClick={(e) => updateRestaurant(restaurant.id, e)} />
                  </div>
                </form>

              </div>
            </div>
            :
            <div>

              <div className="container">
                <div className="card p-5">
                  <h2 className='mb-3'>Add new restaurant</h2>
                  <form className='row g-3'>
                    <div className='row-md-6'>
                      <input
                        type="text"
                        name='title'
                        className='form-control m-auto'
                        placeholder='Title'
                        value={restaurantTitle}
                        onChange={(e) => {
                          setRestaurantTitle(e.target.value);
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
                          setRestaurantCity(e.target.value);
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
                          setRestaurantAdress(e.target.value);
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
                          setRestaurantWorkHours(e.target.value);
                          setNewRestaurant({ ...newRestaurant, work_hours: e.target.value });
                        }} />
                    </div>

                    <div className='my-4'>
                      <input className='btn btn-success px-5' type='submit' value='Add' onClick={(e) => addRestaurant(e)} />
                    </div>

                  </form>
                </div>
              </div>
            </div>
          }
        </div>
      </>
    );
  }
}

export default Restaurant;
