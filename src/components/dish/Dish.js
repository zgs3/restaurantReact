import React, { useState, useEffect } from 'react';
import styles from './Dish.module.css'

function Dish() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [dishes, setDishes] = useState([]);
  const [dish, setDish] = useState([]);

  // ALL DISHES
  const [newDish, setNewDish] = useState({});
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [restaurantId, setRestaurantId] = useState('');

  // DISH TO EDIT
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImageLink, setNewImageLink] = useState('');
  const [newRestaurantId, setNewRestaurantId] = useState('');
  const [editedDish, setEditedDish] = useState({});

  const [showDiv, setShowDiv] = useState(false);

  // RATINGS
  const [rating, setRating] = useState('');
  const [newRating, setNewRating] = useState({});
  const [ratings, setRatings] = useState([]);

  const [rateMessage, setRateMessage] = useState(false);


  function deleteDish(id, e) {
    fetch("http://127.0.0.1:8000/api/v1/dishes/" + id, { method: 'DELETE' })
      .then((response) => {
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDish)
    })
      .then((response) => {
        if (response.status === 201) {
          setDishName('');
          setDishPrice('');
          setImageLink('');
          setRestaurantId('');
          fetch("http://127.0.0.1:8000/api/v1/dishes")
            .then(res => res.json())
            .then(
              (result) => {
                setDishes(result);
              })
        }
      })
  }

  function showEdit(id) {
    setShowDiv(!showDiv);
    fetch("http://127.0.0.1:8000/api/v1/dishes/" + id)
      .then(res => res.json())
      .then(
        (result) => {
          setDish(result);
        })
  }

  function updateDish(id, e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/v1/dishes/" + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedDish)
    })
      .then((response) => {
        if (response.status === 200) {
          fetch("http://127.0.0.1:8000/api/v1/dishes")
            .then(res => res.json())
            .then(
              (result) => {
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: id,
        dish_id: rating
      })
    })
      .then((response) => {
        if (response.status === 201) {
          // console.log('success');
          setRateMessage(true);
        }
      })
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/dishes")
      .then(res => res.json())
      .then(
        (result) => {
          setDishes(result);
          setIsLoaded(true);
        },
        (error) => { setError(error); setIsLoaded(true); })
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/ratings")
      .then(res => res.json())
      .then(result => {
        // console.log(Object.keys(result));
        // console.log(result);
        setRatings(result);
      });
  }, [])

  // const filtered = ratings.filter(rating => {
  //   // dishes.filter(id => {
  //   //   return id;
  //   // })
  //   return rating.dish_id == 4;
  // });

  // const filteredDish = dishes.filter(dish => {
  //   // dishes.filter(id => {
  //   //   return id;
  //   // })
  //   return rating.dish_id == 4;
  // });

  // console.log(filtered);


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
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Rating</th>
                <th>Available in</th>
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
                  <td>
                    TBA
                  </td>
                  <td>{dish.restaurant.title}</td>

                  <td>
                    <form>
                      <select onChange={(e) => setRating(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                      <input className='btn btn-success' type='submit' value='Rate!' onClick={(e) => addRating(dish.id, e)} />
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
                      onClick={(e) => {
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
                        setNewName(e.target.value);
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
                        setNewPrice(e.target.value);
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
                        setNewImageLink(e.target.value);
                        setEditedDish({ ...editedDish, image_link: e.target.value });
                      }} />
                  </div>
                  <div className='row-md-6'>
                    <input
                      type="number"
                      name='restaurantId'
                      placeholder={dish.restaurant_id}
                      className='form-control m-auto'
                      onChange={(e) => {
                        setNewRestaurantId(e.target.value);
                        setEditedDish({ ...editedDish, restaurant_id: e.target.value });
                      }} />
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
                      <input
                        type="number"
                        name='restaurant'
                        placeholder='Restaurant'
                        className='form-control m-auto'
                        value={restaurantId}
                        onChange={(e) => {
                          setRestaurantId(e.target.value);
                          setNewDish({ ...newDish, restaurant_id: e.target.value });
                        }} />
                    </div>

                    <div className='my-4'>
                      <input className='btn btn-success px-5' type='submit' value='Add' onClick={(e) => addDish(e)} />
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

export default Dish;
