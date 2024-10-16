const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 z-50">
      <div className="    flex flex-col md:flex-row justify-between items-center px-4 md:px-8  ">
        <div className="text-gray-600 text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://algofolks.com/" target="_blank" rel="noopener noreferrer">
            Algofolks Private Limited
          </a>
          . All rights reserved.
        </div>
        <div className="space-x-4 text-center">
          <a href="/privacy-policy" className="text-gray-600">
            Privacy Policy
          </a>
          <a href="/terms-and-conditions" className="text-gray-600">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
