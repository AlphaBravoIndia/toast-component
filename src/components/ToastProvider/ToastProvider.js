import React from 'react';
import { useKeyDown } from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown('Escape', handleEscape);

  function createToast(variant, message) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        variant,
        message,
      },
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, dismissToast, createToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
