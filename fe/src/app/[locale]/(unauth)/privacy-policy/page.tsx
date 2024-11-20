import React from 'react'

const page = () => {
  return (
    <div className='h-screen overflow-auto'>
    <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-md p-12">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

    <p className="text-gray-600 mb-6 mt-6">
  At Preppal, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website located at{' '}
  <a href=" https://preppal.club/" className="text-blue-500 hover:underline">
  https://preppal.club/
  </a>
  {' '}and any services or products we offer.
</p>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">1. Information We Collect</h2>
    <p className="text-gray-600 mb-6 mt-6">We may collect the following types of information when you interact with our website:</p>
    <ul className="list-disc list-inside mb-4 text-gray-600 pl-5" >
      <li><strong>Personal Information:</strong> Information that identifies you personally, such as your name, email address, postal address, phone number, and any other information you provide to us voluntarily.</li>
      <li><strong>Usage Data:</strong> Information about your interactions with our website, including your IP address, browser type, pages visited, and time spent on our site.</li>
      <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to enhance your experience on our website. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our website.</li>
    </ul>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">2. How We Use Your Information</h2>
    <p className="text-gray-600 mb-6 mt-6">We use the information we collect for the following purposes:</p>
    <ul className="list-disc list-inside mb-6 text-gray-600 pl-5">
      <li>To provide and maintain our website and services.</li>
      <li>To improve the user experience and personalize your interactions with our site.</li>
      <li>To communicate with you, including sending updates, promotions, and information related to your account.</li>
      <li>To analyze and monitor usage trends and website performance.</li>
      <li>To comply with legal obligations or to protect our legal rights.</li>
    </ul>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">3. Sharing Your Information</h2>
    <p className="text-gray-600 mb-6 mt-6">We do not sell or rent your personal information to third parties. However, we may share your information in the following cases:</p>
    <ul className="list-disc list-inside mb-4 text-gray-600 pl-5">
      <li>With service providers who assist in operating our website or conducting our business, such as payment processors, hosting providers, and marketing partners.</li>
      <li>If required by law, to comply with legal processes, or in response to lawful government requests.</li>
      <li>To protect our rights, privacy, safety, or property, or that of others.</li>
    </ul>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">4. Data Security</h2>
    <p className="text-gray-600 mb-6 mt-6">
      We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no data transmission over the internet or electronic storage method is 100% secure, so we cannot guarantee the absolute security of your information.
    </p>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">5. Your Data Rights</h2>
    <p className="text-gray-600 mb-6 mt-6">You have the right to:</p>
    <ul className="list-disc list-inside mb-4 text-gray-600 pl-5">
      <li>Access the personal information we hold about you.</li>
      <li>Request correction of any inaccurate or incomplete information.</li>
      <li>Request the deletion of your personal information, subject to certain legal obligations.</li>
      <li>Object to or restrict the processing of your personal information in certain circumstances.</li>
      <li>Withdraw your consent to our processing of your personal data at any time, where we rely on your consent to process your data.</li>
    </ul>
    <p className="text-gray-600 mb-6">
  To exercise any of these rights, please contact us at{' '}
  <a href="mailto:support@preppal.club" className="text-blue-500 hover:underline">
    support@preppal.club
  </a>.
</p>


    <h2 className="text-2xl font-semibold text-gray-700 mt-4">6. Third-Party Links</h2>
    <p className="text-gray-600 mb-6 mt-6">
      Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these third-party websites. We encourage you to review the privacy policies of any sites you visit through external links.
    </p>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">7. Children's Privacy</h2>
    <p className="text-gray-600 mb-6 mt-6">
      Our website is not intended for use by individuals under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete that information as soon as possible.
    </p>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">8. Changes to This Privacy Policy</h2>
    <p className="text-gray-600 mb-6 mt-6">
      We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting on this page. Your continued use of our website after the changes are posted signifies your acceptance of the revised Privacy Policy.
    </p>

    <h2 className="text-2xl font-semibold text-gray-700 mt-4">9. Contact Us</h2>
    <p className="text-gray-600 mb-6 mt-6">
      If you have any questions or concerns about this Privacy Policy or how we handle your personal information, you can contact us at:
    </p>
    <ul className="list-disc list-inside mb-4 text-gray-600 pl-5">
  <li>Email: <span className="ml-2"><a href="mailto:support@preppal.club" className="text-blue-600 hover:underline">support@preppal.club</a></span></li>
  <li>
  Phone: 
  <a href="tel:01204444859" className="ml-2 text-blue-600 hover:underline">
    0120 4444859
  </a>
</li>

  <li>Mailing Address: <span className="ml-2">Algofolks Private Limited</span></li>
</ul>

  </div>
  </div>
  )
}

export default page