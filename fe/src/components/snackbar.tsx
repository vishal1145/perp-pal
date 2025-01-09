import { useEffect } from "react";
interface SnackbarProps {
  message: string;
  type: String;
  onClose: () => void;
}
const Snackbar = ({ message, type, onClose }: SnackbarProps) => {
  useEffect(() => {

    const timer = setTimeout(onClose, 3000);


    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 p-3 rounded text-white text-center shadow-lg z-50 ${type === "error" ? "bg-red-500" : "bg-green-500"
        }`}
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold"
      >
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
