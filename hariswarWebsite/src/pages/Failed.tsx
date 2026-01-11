import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// when none of the route matches 
const not_foundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: ", // shows the error message
      location.pathname
    );
  }, [location.pathname]);

  // displaying the message 
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-gray-400 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-400 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default not_foundPage;