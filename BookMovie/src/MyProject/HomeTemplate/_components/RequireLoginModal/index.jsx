import { Link, useNavigate } from "react-router-dom";

export default function RequireLoginModal({ open, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Bạn cần đăng nhập</h3>
        <p className="text-sm text-gray-600 mb-4">
          Hãy đăng nhập để tiếp tục đặt vé và sử dụng tính năng này.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            onClick={onClose}
          >
            Đóng
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}


