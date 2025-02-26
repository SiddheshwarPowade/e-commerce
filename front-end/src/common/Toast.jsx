import { toast } from "react-toastify";

const showToast = (message, type) => {
  toast(message, {
    type: type,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export function showSuccessToast(title, content) {
  showToast(title, "success");
}

export function showErrorToast(title, content) {
  showToast(title, "error");
}

export function showInfoToast(title, content) {
  showToast(title, "info");
}

export function showWarningToast(title, content) {
  showToast(title, "warning");
}
