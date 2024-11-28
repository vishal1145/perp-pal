const Footer = () => {
  return (
    <footer className="w-full bg-gray-200 py-4">
      <div className="container mx-auto px-3">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center text-gray-600">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://algofolks.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800 "
            >
              {" - Algofolks Private Limited - "}
            </a>
            All Rights Reserved.
          </div>
          <div className="mt-1 lg:mt-0 flex gap-3 text-center">
            <a
              href="/privacy-policy"
              className="text-gray-600 hover:text-gray-800"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              className="text-gray-600 hover:text-gray-800"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
