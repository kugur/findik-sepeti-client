import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultToastOptions = {
  position: "top-center",
  autoClose: 500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const Toaster = {
  info: (message, config = {}) => {
    toast.info(message, Object.assign({}, defaultToastOptions, config));
  },
  error: (message, config = {}) => {
    toast.error(message, Object.assign({}, defaultToastOptions, config));
  },
  warning: (message, config = {}) =>
    toast.warn(message, Object.assign({}, defaultToastOptions, config)),
};

const CustomToastContainer = () => 
  <ToastContainer
    position="top-center"
    autoClose={500}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
;

export { CustomToastContainer, Toaster };
