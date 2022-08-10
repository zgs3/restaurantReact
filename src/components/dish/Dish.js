import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dish.css'
import Spinner from '../../assets/loading.gif'
import CreateDish from './createDish/CreateDish';
import UpdateDish from './updateDish/UpdateDish';
import FilterDish from './filterDish/FilterDish';
import SearchDish from './searchDish/SearchDish';
import RateForm from './rateForm/RateForm';
import Header from '../header/Header';

function Dish() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [token, _] = useState(localStorage.getItem('token'));
  const [admin, __] = useState(localStorage.getItem('admin'));
  const nav = useNavigate();

  const [dishes, setDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [dish, setDish] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [showDiv, setShowDiv] = useState(false);

  const [sortPrice, setSortPrice] = useState();
  const [sortTitle, setSortTitle] = useState();

  const [ratings, setRatings] = useState([]);
  const [rateMessage, setRateMessage] = useState(false);
  const [loadRating, setLoadRatings] = useState(false);
  const [searchError, setSearchError] = useState(false);

  function deleteDish(id) {
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/dishes/" + id, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((response) => {
      if (response.status === 200) {
        const remaining = dishes.filter(item => id !== item.id)
        setDishes(remaining)
      }
    });
  }

  function addDish(e, newDish) {
    e.preventDefault();
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/dishes", {
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
          fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/dishes", {
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
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/dishes/" + id, {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => res.json())
      .then((result) => {
        setDish(result);
        setShowDiv(!showDiv);
      })
  }

  function updateDish(id, editedDish, e) {
    e.preventDefault();
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/dishes/" + id, {
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
          fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/dishes", {
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
          }).then(res => res.json())
            .then((result) => {
              setDishes(result);
              setShowDiv(!showDiv);
            })
        }
      })
  }

  function addRating(id, rating, e) {
    e.preventDefault();
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/ratings", {
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
    ratings.filter(rating => rating.dish_id === dishId).map(rating => {
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

  function filterDishes(e, id) {
    e.preventDefault();
    const remaining = allDishes.filter(dish => (dish.restaurant_id === parseInt(id)))
    setDishes(remaining);
  }

  function resetFilter(e) {
    e.preventDefault();
    setDishes(allDishes);
  }

  function handleSearch(e, inputValue) {
    e.preventDefault();
    const value = inputValue.toLowerCase();
    const filtered = allDishes.filter(dish => dish.name.toLowerCase().includes(value))
    if (filtered.length !== 0) {
      setDishes(filtered);
      setSearchError(false);
    } else {
      setSearchError(true);
    }
  }

  useEffect(() => {
    if (!token) return nav("/login");
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/dishes", {
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
      setAllDishes(result);
      setIsLoaded(true);
    }, (error) => {
      setError(error);
      setIsLoaded(true);
    })
  }, [])

  useEffect(() => {
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/ratings", {
      headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
    }).then(res => res.json())
      .then(result => {
        setRatings(result);
      });
  }, [loadRating])

  useEffect(() => {
    fetch("https://zgs-restaurant-api.herokuapp.com/api/v1/restaurants", {
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
    return (
      <div className='spinnerContainer'>
        <img src={Spinner}></img>
      </div>
    );
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <Header />
        <div className="container">
          <h1 className='text-center my-4'>List of currently available dishes</h1>
          {(rateMessage)
            ? <div className='alert alert-success text-center fs-4 py-1'>
              Thank you for your rating!
            </div>
            : <span></span>
          }
          <div>
            {(searchError)
              ? <div className='alert alert-danger text-center fs-4  py-1'>No matches found.</div>
              : null
            }
            <div className='d-flex justify-content-around px-5 py-2 border rounded-top  bg-light bg-gradient'>
              <SearchDish handleSearch={handleSearch} />
              <FilterDish restaurants={restaurants} filterDishes={filterDishes} resetFilter={resetFilter} />
            </div>
          </div>
          <div className='border border-top-0 rounded-bottom mb-5'>
            <table className="table table-hover">
              <thead>
                <tr className='fs-4 bg-light bg-gradient'>
                  <th>Name</th>
                  <th>
                    Price
                    <button
                      className='btn btn-outline-dark px-1 py-0 mx-2'
                      onClick={() => setSortPrice(!sortPrice)}>
                      Sort
                    </button>
                  </th>
                  <th>Photo</th>
                  <th>Rating</th>
                  <th>
                    Available in
                    <button
                      className='btn btn-outline-dark px-1 py-0 mx-2'
                      onClick={() => setSortTitle(!sortTitle)}>
                      Sort
                    </button>
                  </th>
                  <th>Rate!</th>
                  {(admin)
                    ? <th>Actions</th>
                    : null
                  }
                </tr>
              </thead>
              <tbody>
                {dishes.map(dish => (
                  <tr key={dish.id}>
                    <td>{dish.name}</td>
                    <td>{dish.price} Eur.</td>
                    <td>
                      <div className='d-flex align-items-center imgContainer'>
                        <img src={dish.image_link} alt='Photo of the dish'></img>
                      </div>
                    </td>
                    <td className='fs-5'>
                      {(countAvg(dish.id))
                        ? countAvg(dish.id).toPrecision(2)
                        : 'Not rated'
                      }!
                    </td>
                    <td>{dish.restaurant.title}</td>
                    <td>
                      <RateForm addRating={addRating} dishId={dish.id} />
                    </td>
                    {(admin)
                      ? <td>
                        <button
                          className="btn btn-danger btn-sm me-1"
                          onClick={(e) => deleteDish(dish.id, e)}>
                          Delete
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            showEdit(dish.id)
                          }}>
                          Edit
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
            ? <UpdateDish dish={dish} restaurants={restaurants} updateDish={updateDish} />
            : <CreateDish createDish={addDish} restaurants={restaurants} />
          }</>
          : null
        }
      </>
    );
  }
}

export default Dish;
