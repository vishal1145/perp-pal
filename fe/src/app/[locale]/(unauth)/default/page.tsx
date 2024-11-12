
'use client';
import React, { useEffect, useState } from 'react';
import { setUserProfile } from '@/data/functions';

const defaultPage = () => {
  const [loading, setLoading] = useState(true);
  const [loadingUserData, setLoadingUserData] = useState(true);
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
        setUserProfile(null);
        console.warn('User is not logged in or session has expired');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserProfile(null);
    } finally {
        setLoadingUserData(false); 
      }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return loading ? null : null; 
};

export default defaultPage;
