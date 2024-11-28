import React from "react";

const page = () => {
  return (
    <div className="h-screen overflow-auto">
      <div className="container mx-auto rounded-lg bg-gray-50 p-8 shadow-md ">
        <h1 className="mb-7 text-3xl font-bold text-gray-800">
          Terms and Conditions
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          1. Introduction
        </h2>
        <p className="my-6 text-gray-600">
          Welcome to Preppal. These Terms and Conditions (“Terms”) govern your
          use of our website located at{" "}
          <a
            href="https://preppal.club"
            className="text-blue-600 hover:underline"
          >
            https://preppal.club
          </a>
          , including any related services or products provided by Algofolks Pvt
          Ltd. By accessing or using our website, you agree to comply with and
          be bound by these Terms. If you do not agree to these Terms, you are
          prohibited from using our website and must immediately discontinue
          use.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          2. Acceptance of Terms
        </h2>
        <p className="my-6 text-gray-600">
          By accessing and using this website, you affirm that you are of legal
          age to enter into this agreement or have the permission of a legal
          guardian. Continued use of the website will be construed as your
          acceptance of these Terms in full. We may amend these Terms at any
          time by posting the revised version on our website. It is your
          responsibility to review these Terms regularly.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          3. User Responsibilities
        </h2>
        <p className="my-6 text-gray-600">
          As a user of our website, you agree to:
        </p>
        <ul className="mb-4 list-inside list-disc pl-5 text-gray-600">
          <li>Use the website in a lawful, ethical, and respectful manner.</li>
          <li>
            Not engage in any activity that is harmful, disruptive, or otherwise
            inappropriate (including spamming, hacking, uploading harmful
            content, etc.).
          </li>
          <li>
            Keep your account information secure and not share your login
            credentials with others.
          </li>
          <li>Not impersonate any other person or entity.</li>
          <li>
            Not attempt to interfere with the website’s operations or security
            systems.
          </li>
          <li>
            Comply with all local, national, or international laws when using
            our website.
          </li>
        </ul>
        <p className="mb-6 text-gray-600">
          Failure to comply with these responsibilities may result in the
          suspension or termination of your account.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          4. Intellectual Property
        </h2>
        <p className="my-6 text-gray-600">
          All content, including but not limited to text, images, logos,
          software, designs, and trademarks displayed on this website, is owned
          by Algofolks pvt ltd or its licensors. You are granted a limited,
          non-transferable, non-exclusive license to access and use the website
          for personal use only. You may not copy, modify, distribute, or create
          derivative works from any of our content without express written
          permission from Algofolks pvt ltd. All rights not expressly granted
          herein are reserved.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          5. Privacy Policy
        </h2>
        <p className="my-6 text-gray-600">
          We value your privacy and are committed to protecting your personal
          information. Our{" "}
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          outlines the types of data we collect, how we store and use it, and
          the measures we take to protect your privacy. By using our website,
          you agree to the collection and use of your data as described in our
          Privacy Policy. Please review our Privacy Policy to understand our
          practices.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          6. Limitation of Liability
        </h2>
        <p className="my-6 text-gray-600">
          To the maximum extent permitted by law, Algofolks pvt ltd is not
          liable for any damages arising from the use or inability to use our
          website, including but not limited to direct, indirect, incidental,
          consequential, or punitive damages. This limitation applies whether
          the claim is based on contract, tort, negligence, strict liability, or
          any other legal theory. We do not guarantee that the website will be
          free from errors, viruses, or interruptions in service.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          7. Modifications of Terms
        </h2>
        <p className="my-6 text-gray-600">
          We reserve the right to modify these Terms at any time. Any changes
          will be effective immediately upon posting on the website. Your
          continued use of the website after changes to these Terms signifies
          your acceptance of the new Terms. It is your responsibility to review
          the Terms periodically to stay informed of updates.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          8. Governing Law
        </h2>
        <p className="my-6 text-gray-600">
          These Terms and any disputes arising out of or in connection with the
          use of our website shall be governed by and construed in accordance
          with the laws of [Jurisdiction], without regard to its conflict of law
          provisions. Any legal proceedings must be brought in the courts
          located in [Jurisdiction], and you consent to the jurisdiction of such
          courts.
        </p>

        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          9. Contact Information
        </h2>
        <p className="my-6 text-gray-600">
          If you have any questions or concerns regarding these Terms, or if you
          need support, you may contact us at:
        </p>
        <ul className="mb-4 list-inside list-disc pl-5 text-gray-600">
          <li>
            Email:{" "}
            <span className="ml-2">
              <a
                href="mailto:support@preppal.club"
                className="text-blue-600 hover:underline"
              >
                support@preppal.club
              </a>
            </span>
          </li>
          <li>
            Phone:
            <a
              href="tel:01204444859"
              className="ml-2 text-blue-600 hover:underline"
            >
              0120 4444859
            </a>
          </li>
          <li>
            Mailing Address:{" "}
            <span className="ml-2">
              {" "}
              Algofolks Private Limited, C-104 Sector 65 Noida
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
