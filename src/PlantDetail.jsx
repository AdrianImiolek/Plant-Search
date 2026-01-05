import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // No API_KEY needed!
  const API_URL = import.meta.env.VITE_API_URL
  
  useEffect(() => {
    // Call YOUR backend, not Perenual directly
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
  
  if (loading) return <div className="p-8">Loading plant details...</div>;
  if (error) return <div className="p-8">Error: {error.message}</div>;
  if (!plant) return <div className="p-8">Plant not found</div>;
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link 
        to="/" 
        className="inline-block mb-6 text-blue-500 hover:underline"
      >
        ← Back to all plants
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
          <h1 className="text-4xl font-bold mb-4">{plant.common_name}</h1>
          
          <div className="space-y-4">
            <div>
              <strong className="text-gray-600">Scientific Name:</strong>
              <p className="text-lg italic">{plant.scientific_name?.join(', ')}</p>
            </div>
            
            {plant.other_name?.length > 0 && (
              <div>
                <strong className="text-gray-600">Other Names:</strong>
                <p>{plant.other_name.join(', ')}</p>
              </div>
            )}
            
            <div>
              <strong className="text-gray-600">Family:</strong>
              <p>{plant.family}</p>
            </div>
            
            {plant.watering && (
              <div>
                <strong className="text-gray-600">Watering:</strong>
                <p>{plant.watering}</p>
              </div>
            )}
            
            {plant.sunlight?.length > 0 && (
              <div>
                <strong className="text-gray-600">Sunlight:</strong>
                <p>{plant.sunlight.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}