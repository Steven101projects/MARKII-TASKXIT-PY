import { useEffect } from "react";

export default function ToastBox({
  message,
  type = "success",
  onClose,
  duration = 2500,
}) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const toastStyle =
    type === "success"
      ? "bg-green-100 border-green-500 text-green-800"
      : type === "error"
      ? "bg-red-100 border-red-500 text-red-800"
      : "bg-blue-100 border-blue-500 text-blue-800";

  return (
    <div
      className={`fixed top-5 right-5 z-50 border-l-4 rounded-lg shadow-lg px-5 py-3 min-w-64 max-w-80 ${toastStyle}`}
    >
      <div className="flex justify-between items-start gap-4">
        <p className="font-semibold text-sm">{message}</p>

        <button
          type="button"
          onClick={onClose}
          className="font-bold text-lg leading-none hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
}