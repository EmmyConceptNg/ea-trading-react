import { Zoom, toast } from "react-toastify";


export const notify = (message, type) => {
  const notifyObject = {
    info: () =>
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        toastId: "01",
        transition: Zoom,
      }),

    success: () =>
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        toastId: "02",
        transition: Zoom,
      }),

    warn: () =>
      toast.warn(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        toastId: "03",
        transition: Zoom,
      }),

    error: () =>
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        toastId: "04",
        transition: Zoom,
      }),
  }[type]();
};
