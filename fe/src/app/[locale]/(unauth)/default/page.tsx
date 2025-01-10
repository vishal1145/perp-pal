'use client'; // Make sure you're using 'use client' if it's client-side logic
import { useEffect } from 'react';
import { setUserProfile, UserProfile } from '@/data/functions';

const DefaultPage = () => {
  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/me`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData.data);
      } else {
        setUserProfile(null as unknown as UserProfile);
        console.warn('User is not logged in or session has expired');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserProfile(null as unknown as UserProfile);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Return null to avoid rendering any UI
  return null;
};

export default DefaultPage;
