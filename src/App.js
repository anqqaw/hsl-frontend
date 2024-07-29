
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/route', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: { lat: 60.1699, lon: 24.9384 },
            to: { lat: 60.2055, lon: 24.6559 },
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data.plan.itineraries);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Route Planner</h1>
      {error && <p>Error: {error}</p>}
      {data ? (
        <div>
          {data.map((itinerary, index) => (
            <div key={index}>
              <h2>Itinerary {index + 1}</h2>
              {itinerary.legs.map((leg, legIndex) => (
                <p key={legIndex}>
                  {leg.mode} from {new Date(leg.startTime).toLocaleTimeString()} to {new Date(leg.endTime).toLocaleTimeString()} ({leg.duration} seconds)
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
