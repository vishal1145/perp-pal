import { useEffect } from "react";
import { useRouter } from "next/navigation";
const Footer = () => {
  const router = useRouter();
  useEffect(()=>{
    const routes = [
      '/privacy-policy',
      '/terms-and-conditions'
    ];

    Promise.all(routes.map(route => router.prefetch(route)))
      .then(() => {
        console.log('All routes prefetched');
      })
      .catch((err) => {
        console.error('Error prefetching routes:', err);
      });
  }, [])
  return (
    <footer className="w-full bg-gray-200 py-4">
      <div className="px-4 md:px-8">
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
