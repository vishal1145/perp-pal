import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { setUserProfile } from '@/data/functions';

const GoogleLoginButton = ({ onClose }: { onClose: () => void }) => {
  const handleGoogleSuccess = async (response: any) => {
    const token = response.credential;

    if (token) {
      try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        response = await res.json();
        setUserProfile(response.data);
        onClose();
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    } else {
      console.error('No credential received');
    }
  };

  const handleGoogleError = () => {
    console.log('Google login error:');
  };

  return (
    <div className="w-full flex items-center justify-center">
      <GoogleOAuthProvider clientId="545362908623-funr640u1caveqkvrcv9jnvr50j7cj6d.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        // scope="email profile"
        />
      </GoogleOAuthProvider>
    </div>

  );
};

export default GoogleLoginButton;
