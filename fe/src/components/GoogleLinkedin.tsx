import React from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { setUserProfile } from '@/data/functions';

export default function SocialLoginButtons({ onClose }: { onClose: () => void }) {
  // Handle Google login success
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

  // Handle Google login error
  const handleGoogleError = () => {
    console.log('Google login error:');
  };

  return (
    <div className="flex justify-between">
      {/* LinkedIn Login Button */}
      <LinkedIn
        clientId="86exjopv4tvm47"
        redirectUri={`${window.location.origin}`}
        onSuccess={(code: String) => {
          console.log(code);
        }}
        onError={(error: any) => {
          console.log(error);
        }}
      >
        {({ linkedInLogin }: { linkedInLogin: () => void }) => (
          <button
            className="cursor-pointer rounded-lg border border-gray-500 bg-transparent px-5 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none"
            style={{
              border: '1px solid rgb(226, 226, 226)',
              color: 'rgb(107, 114, 128)',
            }}
            onClick={linkedInLogin}
          >
            Sign in with LinkedIn
          </button>
        )}
      </LinkedIn>

      {/* Google Login Button */}
      <div style={{ width: '200px', overflow: 'hidden' }}>
        <GoogleOAuthProvider clientId="545362908623-funr640u1caveqkvrcv9jnvr50j7cj6d.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            // scope="email profile"
            size="medium"
            shape="rectangular"
            text="signin_with"
            useOneTap
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
