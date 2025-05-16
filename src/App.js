import { useState, useEffect } from 'react';
import Portfolio from './Portfolio';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <h1 className="text-2xl font-bold">Loading Portfolio...</h1>
        </div>
      ) : (
        <Portfolio />
      )}
    </div>
  );
}

export default App;