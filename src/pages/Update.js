import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import supabase from "../config/supabaseClient";
// import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating){
      setFormError('Please fill in all the fields correctly.');
      return;
    }

    // Check that rating is a number between 1 and 10
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
      setFormError('Rating must be between 1 and 10.');
      return;
    }

    const { data, error } = await supabase
      .from('smoothies')
      .update({ title, method, rating })
      .eq('id', id)
      .select();

     if (error) {
        setFormError('Failed to update smoothie.');
      } else if (data && data.length > 0) {
        setFormError(null);
        navigate('/');
      } else {
        setFormError('No smoothie updated (maybe record not found).');
      }
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single();
      if (error) {
        navigate('/', { replace: true });
      } else if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log("Smoothie data fetched:", data);
      }
    }
    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page update">
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
          min={1}
          max={10}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update