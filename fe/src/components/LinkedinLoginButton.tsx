// import React from 'react';
// import LinkedIn from 'react-linkedin-login';

// const LinkedInLoginButton = () => {
//   const handleLinkedInResponse = async (response: any) => {
//     if (response.code) {
//       try {
//         await fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/signin`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ token: response.code }), // LinkedIn provides a temporary authorization code
//         });
//         console.log('LinkedIn sign-in successful');
//       } catch (error) {
//         console.error('Error during LinkedIn sign-in:', error);
//       }
//     } else {
//       console.error('LinkedIn login failed:', response);
//     }
//   };

//   return (
//     <div>
//       <LinkedIn
//         clientId="86exjopv4tvm47" // Replace with your LinkedIn app Client ID
//         redirectUri={`${window.location.origin}/linkedin`}
//         onFailure={handleLinkedInResponse}
//         onSuccess={handleLinkedInResponse}
//       >
//         <button style={{ padding: '10px 20px', background: '#0077b5', color: '#fff', border: 'none', borderRadius: '5px' }}>
//           Sign in with LinkedIn
//         </button>
//       </LinkedIn>
//     </div>
//   );
// };

// export default LinkedInLoginButton;
