import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';

// Components
import SmoothieCard from '../components/SmoothieCard';


const Home = () => {
  // You can use supabase here to fetch data or perform actions
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select();  
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
  }, []);

  return (
    <div className="page home">
      {fetchError && <p className="error">{fetchError}</p>}
      {smoothies &&  (
        <div className="smoothies">
          {/* Smoothie Grid order-by buttons */}
          <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie} />
          ))}
          </div>
        </div>
        
      )}
    </div>
  )
}

export default Home