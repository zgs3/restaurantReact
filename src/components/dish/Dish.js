import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dish.module.css'

function Dish() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, _] = useState(localStorage.getItem('token'));
  const nav = useNavigate();

  const [dishes, setDishes] = useState([]);
  const [dish, setDish] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [sortPrice, setSordPrice] = useState();
  const [sortTitle, setSordTitle] = useState();

  // ALL DISHES
  const [newDish, setNewDish] = useState({});
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [imageLink, setImageLink] = useState('');

  // DISH TO EDIT
  const [editedDish, setEditedDish] = useState({});
  const [showDiv, setShowDiv] = useState(false);

  // RATINGS
  const [rating, setRating] = useState('');
  const [ratings, setRatings] = useState([]);
  const [rateMessage, setRateMessage] = useState(false);
  const [loadRating, setLoadRatings] = useState(false);


  function deleteDish(id, e) {
    fetch("http://127.0.0.1:8000/api/v1/dishes/" + id, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((response) => {
      if (response.status === 200) {
        const remaining = dishes.filter(item => id !== item.id)
        setDishes(remaining)
      }
    });
  }

  function addDish(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/dishes", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDish)
    })
      .then((response) => {
        if (response.status === 201) {
          setDishName('');
          setDishPrice('');
          setImageLink('');
          fetch("http://127.0.0.1:8000/api/v1/dishes", {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          }).then(res => res.json())
            .then((result) => {
              setDishes(result);
            })
        }
      })
  }

  function showEdit(id) {
    fetch("http://127.0.0.1:8000/api/v1/dishes/" + id, {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => res.json())
      .then((result) => {
        setDish(result);
        setShowDiv(!showDiv);
        // setEditLoaded(true);
      })
  }

  function updateDish(id, e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/dishes/" + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedDish)
    })
      .then((response) => {
        if (response.status === 200) {
          fetch("http://127.0.0.1:8000/api/v1/dishes", {
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
          }).then(res => res.json())
            .then((result) => {
              setDishes(result);
              setShowDiv(!showDiv);
            })
        }
      })
  }

  function addRating(id, e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/ratings", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: rating,
        dish_id: id
      })
    }).then((response) => {
      if (response.status === 201) {
        setRateMessage(true);
      }
      setLoadRatings(!loadRating);
    })
  }

  function countAvg(dishId) {
    let rateCount = 0;
    let sumOfRates = 0;
    ratings.map(rating => {
      if (rating.dish_id === dishId) {
        rateCount++;
        sumOfRates += rating.rating;
      }
    })
    return (sumOfRates / rateCount);
  }

  if (sortPrice === true) {
    sortPriceAsc();
  } else if (sortPrice === false) {
    sortPriceDesc();
  }

  function sortPriceAsc() {
    const list = dishes;
    list.sort((a, b) => {
      let first = a.price,
        second = b.price;
      if (first < second) {
        return -1;
      }
      if (first > second) {
        return 1;
      }
      return 0;
    });
  }

  function sortPriceDesc() {
    const list = dishes;
    list.sort((a, b) => {
      let first = a.price,
        second = b.price;
      if (first > second) {
        return -1;
      }
      if (first < second) {
        return 1;
      }
      return 0;
    });
  }

  if (sortTitle === true) {
    sortTitleAsc();
  } else if (sortTitle === false) {
    sortTitleDesc();
  }

  function sortTitleAsc() {
    const list = dishes;
    list.sort((a, b) => {
      let first = a.restaurant.title.toLowerCase(),
        second = b.restaurant.title.toLowerCase();
      if (first < second) {
        return -1;
      }
      if (first > second) {
        return 1;
      }
      return 0;
    });
  }

  function sortTitleDesc() {
    const list = dishes;
    list.sort((a, b) => {
      let first = a.restaurant.title.toLowerCase(),
        second = b.restaurant.title.toLowerCase();
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
    fetch("http://127.0.0.1:8000/api/v1/dishes", {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (!res.ok) {
        setError(res.statusText);
        setIsLoaded(true);
      } else {
        return res.json();
      }
    }).then((result) => {
      setDishes(result);
      setIsLoaded(true);
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    })
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/ratings", {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => res.json())
      .then(result => {
        setRatings(result);
      });
  }, [loadRating])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/restaurants", {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (!res.ok) {
        setError(res.statusText);
        setIsLoaded(true);
      } else {
        return res.json();
      }
    }).then((result) => {
      setRestaurants(result);
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    })
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div className="container">
          {(rateMessage)
            ? <div className='d-flex justify-content-center bg-success my-3 p-1 rounded-3'>
              <h4>Thank you for your rating!</h4>
            </div>
            : <span></span>
          }
          <table className="table table-striped table-hover">
            <thead>
              <tr className='fs-4'>
                <th>Name</th>
                <th>
                  Price
                  <button
                    className='btn btn-outline-dark p-1 mx-2'
                    onClick={() => setSordPrice(!sortPrice)}>
                    Sort
                  </button>
                </th>
                <th>Photo</th>
                <th>Rating</th>
                <th>
                  Available in
                  <button
                    className='btn btn-outline-dark p-1 mx-2'
                    onClick={() => setSordTitle(!sortTitle)}>
                    Sort
                  </button>
                </th>
                <th>Rate!</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map(dish => (
                <tr key={dish.id}>
                  <td>{dish.name}</td>
                  <td>{dish.price} Eur.</td>
                  <td> <img src={dish.image_link} alt='Photo of the dish'></img> </td>
                  <td className='fs-5'>
                    {(countAvg(dish.id))
                      ? countAvg(dish.id).toPrecision(2)
                      : 'Not rated'
                    }!
                  </td>
                  <td>{dish.restaurant.title}</td>
                  <td>
                    <form>
                      <div className='d-flex'>
                        <select className="form-select form-select-sm" onChange={(e) => setRating(e.target.value)}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                        <input className='btn btn-success' type='submit' value='Rate!' onClick={(e) => addRating(dish.id, e)} />
                      </div>
                    </form>
                  </td>

                  <td>
                    <button
                      className="btn btn-dark"
                      onClick={(e) => deleteDish(dish.id, e)}>
                      Delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        showEdit(dish.id)
                      }}>
                      Edit
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
                    <input className='btn btn-success px-5' type='submit' value='Edit' onClick={(e) => updateDish(dish.id, e)} />
                  </div>
                </form>

              </div>
            </div>
            :
            <div>

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
                      <select className="form-select" onChange={(e) => {
                        setNewDish({ ...newDish, restaurant_id: e.target.value })
                      }}>
                        <option selected disabled aria-required>Select a restaurant</option>
                        {restaurants.map(restaurant => (
                          <option key={restaurant.id} value={restaurant.id}>{restaurant.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className='my-4'>
                      <input className='btn btn-success px-5' type='submit' value='Add' onClick={(e) => addDish(e)} />
                    </div>

                  </form>
                </div>
              </div>
            </div>
          }
        </div >
      </>
    );
  }
}

export default Dish;
