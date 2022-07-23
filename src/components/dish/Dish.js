import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dish.module.css'
import CreateDish from './createDish/CreateDish';
import UpdateDish from './updateDish/UpdateDish';
import FilterDish from './filterDish/FilterDish';
import SearchDish from './searchDish/SearchDish';
import RateForm from './rateForm/RateForm';

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

  const [sortPrice, setSordPrice] = useState();
  const [sortTitle, setSordTitle] = useState();

  const [ratings, setRatings] = useState([]);
  const [rateMessage, setRateMessage] = useState(false);
  const [loadRating, setLoadRatings] = useState(false);
  const [searchError, setSearchError] = useState(false);

  function deleteDish(id) {
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

  function addDish(e, newDish) {
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
      })
  }

  function updateDish(id, editedDish, e) {
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

  function addRating(id, rating, e) {
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

  function resetFilter() {
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
      setAllDishes(result);
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
          <h1 className='text-center my-4'>List of currently available dishes</h1>
          {(rateMessage)
            ? <div className='d-flex justify-content-center bg-success my-3 p-1 rounded-3'>
              <h4>Thank you for your rating!</h4>
            </div>
            : <span></span>
          }
          <div>
            {(searchError)
              ? <div className='alert alert-danger'>No matches found.</div>
              : null
            }
            <div className='d-flex justify-content-around px-5 py-2 border rounded-top'>
              <SearchDish handleSearch={handleSearch} />
              <FilterDish restaurants={restaurants} filterDishes={filterDishes} resetFilter={resetFilter} />
            </div>
          </div>
          <div className='p-2 border rounded-bottom'>
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
                    <td> <img src={dish.image_link} alt='Photo of the dish'></img> </td>
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
                      : null
                    }
                  </tr>)
                )}
              </tbody>
            </table>
          </div>
        </div >
        {(admin)
          ? <div className='container'>
            {(showDiv)
              ? <UpdateDish dish={dish} restaurants={restaurants} updateDish={updateDish} />
              : <CreateDish createDish={addDish} restaurants={restaurants} />
            }
          </div >
          : null
        }
      </>
    );
  }
}

export default Dish;
