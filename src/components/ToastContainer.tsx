import { useStore } from '../store/useStore';
import Toast, { Toast as ToastType } from './Toast';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast: ToastType) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onClose={removeToast} />
        </div>
      ))}
    </div>
  );
}
