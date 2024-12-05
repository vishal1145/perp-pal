// import React from 'react';
// import FacebookLogin from 'react-facebook-login';

// const FacebookLoginButton = () => {
//   const handleFacebookResponse = async (response: any) => {
//     if (response.accessToken) {
//       try {
//         await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/signin`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ token: response.accessToken }),
//         });
//         console.log('Facebook sign-in successful');
//       } catch (error) {
//         console.error('Error during Facebook sign-in:', error);
//       }
//     } else {
//       console.error('Facebook login failed');
//     }
//   };

//   return (
//     <div>
//       <FacebookLogin
//         appId="YOUR_FACEBOOK_APP_ID"
//         autoLoad={false}
//         fields="name,email,picture"
//         callback={handleFacebookResponse}
//         icon="fa-facebook"
//         textButton="Sign in with Facebook"
//       />
//     </div>
//   );
// };

// export default FacebookLoginButton;
