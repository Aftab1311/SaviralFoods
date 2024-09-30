import  { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import OrderHistory from './OrderHistory';


export const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get JWT token from local storage
    const token = localStorage.getItem('authToken');
    console.log(token);
    
    if (token) {
      try {
        // Decode the token to get the user data
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        setUserData(decodedToken);
        // console.log(userData);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
  

  return (
    <div className='flex flex-col w-full md:mt-20 mt-28'>
    <div className="flex flex-col justify-center items-center w-full h-[400px] bg-white p-8 rounded-lg shadow-xl">
      <div>
      <FaUserCircle size={200} />
      </div>
      <h2 className="text-2xl font-bold my-6">Profile</h2>
      <div className="flex flex-col md:flex-row md:gap-10 mt-4 items-center">
        <div className="mb-4">
          <span className="font-semibold">Name: </span>
          <span>{userData.name}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Email: </span>
          <span>{userData.email}</span>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Phone: </span>
          <span>{userData.phone}</span>
        </div>
        {/* Add other fields you want to display from the token */}
      </div>
    </div>
    <div className='w-full mt-1'><OrderHistory /></div>
    </div>
  );
};


