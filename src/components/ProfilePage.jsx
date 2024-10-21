import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import OrderHistory from './OrderHistory';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [googleUserData, setGoogleUserData] = useState(null); // State for Google user data
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUserData(codeResponse), // Store Google user data
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    // Get JWT token from local storage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      try {
        // Decode the token to get the user data
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken); // Store normal user data
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (googleUserData) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUserData.access_token}`, {
          headers: {
            Authorization: `Bearer ${googleUserData.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          // Update Google user profile data
          const { email, name, picture } = res.data;
          setUserData((prevData) => ({
            ...prevData, // Preserve previous user data
            email,       // Update email from Google
            name,        // Update name from Google
            picture      // Add profile picture
          }));
        })
        .catch((err) => console.log(err));
    }
  }, [googleUserData]);

  const logOut = () => {
    googleLogout();
    setGoogleUserData(null); // Clear Google user data
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
   console.log(userData?.picture)

  return (
    <div className='flex flex-col w-full md:mt-20 mt-28'>
      <div className="flex flex-col justify-center items-center w-full h-[400px] bg-white p-8 rounded-lg shadow-xl">
      <img 
          src={userData?.picture || "fallback_image_url"} // Use a fallback image if no picture
          alt="photo" 
          className='w-40 h-40 rounded-full border-2 border-gray-400 flex justify-center items-center'
        />
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
            <span>{userData.phone || 'N/A'}</span> {/* Handle case if phone is not available */}
          </div>
          {/* Add other fields you want to display from the token */}
        </div>
      </div>
      <div className='w-full mt-1'><OrderHistory /></div>
    </div>
  );
};