import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = import.meta.env.VITE_API_URL
  
  useEffect(() => {
    // Call backend, not Perenual directly
     fetch(`${API_URL}/${id}`) 
      .then(response => response.json())
      .then(data => {
        setPlant(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);
  
  if (loading) return <div className="p-8 h-full loader">Wait a moment... We are fetching your data it may take a while!</div>;
  if (error) return <div className="p-8">Error: {error.message}</div>;
  if (!plant) return <div className="p-8">Plant not found</div>;
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="inline-block mb-6 rounded-2xl bg-green-500 p-2 hover:bg-green-400 duration-300 col-span-2"
      >
        <i className='bx bx-left-arrow-alt' ></i> Back to all plants
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {plant.default_image ? (
            <img
              src={plant.default_image.original_url}
              alt={plant.common_name}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <img 
              src="/no-image.webp"
              alt="No image"
              className="w-full rounded-lg"
            />
          )}
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-4"><i className='bx bxs-leaf' ></i>{plant.common_name}</h1>
          
          <div className="space-y-4">
            <div>
              <strong className="text-gray-600">Scientific Name:</strong>
              <p className="text-lg italic">{plant.scientific_name?.join(', ')}</p>
            </div>
            
            
              <div>
                <strong className="text-gray-600">Other Names:</strong>
                {plant.other_name.length > 0 ? (
                <p>{plant.other_name.join(', ')}</p>
                ): (<p>No other names.</p>)}
              </div>
           
            
            <div>
              <strong className="text-gray-600"><i className='bx bx-child' ></i>Family:</strong>
              {plant.family > 0 ? (   <p>{plant.family}</p>) : (<p>This plant has no family.</p>)}
            </div>
            
            {plant.watering && (
              <div>
                <strong className="text-gray-600"><i className='bx bx-water' ></i> Watering:</strong>
                <p>{plant.watering}</p>
              </div>
            )}
            
            {plant.sunlight?.length > 0 && (
              <div>
                <strong className="text-gray-600"> <i className='bx bxs-sun' ></i> Sunlight:</strong>
                <p>{plant.sunlight.join(', ')}</p>
              </div>
            )}

            
          </div>
        </div>
        {plant.description?.length > 0 && (
              <div className="col-span-2">
                <strong className="text-gray-600">Description:</strong>
                <p>{plant.description}</p>
              </div>
            )}
      </div>
    </div>
  );
}