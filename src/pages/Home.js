import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';

// Components
import SmoothieCard from '../components/SmoothieCard';


const Home = () => {
  // You can use supabase here to fetch data or perform actions
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy , setOrderBy] = useState('created_at');

  const handleDelete = async (id) => {
     // Delete from Supabase
    const { error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting smoothie:", error);
      return;
    }

    // Re-fetch smoothies from Supabase
    const { data, error: fetchError } = await supabase
      .from('smoothies')
      .select();
    if (fetchError) {
      setFetchError('Could not fetch the data');
      setSmoothies(null);
      console.error(fetchError);
    } else {
      setSmoothies(data);
      setFetchError(null);
    }
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, { ascending: true });



      if (error) {
        setFetchError('Could not fetch the data')
        setSmoothies(null);
        console.error(error);
      } else {
        setSmoothies(data);
        setFetchError(null);
      }
      // setIsLoading(false);
    };

    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p className="error">{fetchError}</p>}
      {smoothies &&  (
        <div className="smoothies">
          <div className='order-by'>
            {orderBy && <p>Order by: {orderBy}</p>} 
            <button onClick={() => setOrderBy('created_at')}>Created At</button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
             
          </div>
          <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard 
              key={smoothie.id} 
              smoothie={smoothie} 
              onDelete={handleDelete} />
          ))}
          </div>
        </div>
        
      )}
    </div>
  )
}

export default Home