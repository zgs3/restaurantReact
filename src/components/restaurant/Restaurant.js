import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../assets/loading.gif'
import Header from '../header/Header';
import CreateRestaurant from './createRestaurant/CreateRestaurant';
import UpdateRestaurant from './updateRestaurant/UpdateRestaurant';

function Restaurant() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [sortOrder, setSordOrder] = useState();
  const [restaurant, setRestaurant] = useState([]);
  const [token, _] = useState(localStorage.getItem('token'));
  const [admin, __] = useState(localStorage.getItem('admin'));
  const nav = useNavigate();
  const [showDiv, setShowDiv] = useState(false);

  function deleteRestaurant(id) {
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants/" + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          const remaining = restaurants.filter(item => id !== item.id)
          setRestaurants(remaining)
        }
      });
  }

  function addRestaurant(e, restaurant) {
    e.preventDefault();
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restaurant)
    })
      .then((response) => {
        if (response.status === 201) {
          fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants", {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }).then(res => res.json())
            .then((result) => {
              setRestaurants(result);
            })
        }
      })
  }

  function updateRestaurant(id, restaurant, e) {
    e.preventDefault();
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants/" + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(restaurant)
    }).then((response) => {
      if (response.status === 200) {
        fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants", {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        }).then(res => res.json())
          .then((result) => {
            setRestaurants(result);
            setShowDiv(!showDiv);
          })
      }
    })
  }

  function showEdit(id) {
    setShowDiv(!showDiv);
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants/" + id, {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => res.json())
      .then((result) => {
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
    if (!token) return nav("/login");
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants", {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (!res.ok) {
        if (admin) {
          localStorage.removeItem('token');
          localStorage.removeItem('admin');
        } else {
          localStorage.removeItem('token');
          setError(res.statusText + '. Please log in first.');
          setIsLoaded(true);
        }
      } else {
        return res.json();
      }
    }).then((result) => {
      setRestaurants(result);
      setIsLoaded(true);
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    })
  }, [])

  if (!isLoaded) {
    return (
      <div className='spinnerContainer'>
        <img src={Spinner}></img>
      </div>
    );
  } else if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <>
        <Header />
        <div className='container'>
          <h1 className='text-center my-4'>List of currently available restaurants</h1>
          <div className='my-2 border border rounded mb-5'>
            <table className="table table-hover">
              <thead>
                <tr className='fs-4 bg-light bg-gradient'>
                  <th>
                    Title
                    <button
                      className='btn btn-outline-dark px-1 py-0 mx-2'
                      onClick={() => setSordOrder(!sortOrder)}>
                      Sort
                    </button>
                  </th>
                  <th>City</th>
                  <th>Adress</th>
                  <th>Working hours</th>
                  {(admin)
                    ? <th>Actions</th>
                    : null
                  }
                </tr>
              </thead>
              <tbody>
                {restaurants.map(restaurant => (
                  <tr key={restaurant.id}>
                    <td>{restaurant.title}</td>
                    <td>{restaurant.city}</td>
                    <td>{restaurant.adress}</td>
                    <td>{restaurant.work_hours}</td>
                    {(admin)
                      ? <td>
                        <button
                          className="btn btn-danger me-1 btn-sm"
                          onClick={() => deleteRestaurant(restaurant.id)}>
                          Delete
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            showEdit(restaurant.id)
                          }}>
                          Update
                        </button>
                      </td>
                      : null
                    }
                  </tr>)
                )}
              </tbody>
            </table>
          </div>
        </div >
        {(admin)
          ? <>{(showDiv)
            ? <UpdateRestaurant updateRestaurant={updateRestaurant} selectedRestaurant={restaurant} />
            : <CreateRestaurant createRestaurant={addRestaurant} />
          }</>
          : null
        }
      </>
    );
  }
}

export default Restaurant;
