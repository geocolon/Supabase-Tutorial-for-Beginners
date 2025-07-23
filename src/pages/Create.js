import { useState } from 'react';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  // State variables for form inputs

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('smoothies')
      .insert([{ title, method, rating }])
      console.log("data", data, "error", error) // Add this for debugging

      if (error) {
      setFormError('Please fill in all the fields correctly.')
      } else {
        setFormError(null)
        console.log("Should be navigating to home")
        navigate('/')
    }
  }


  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create