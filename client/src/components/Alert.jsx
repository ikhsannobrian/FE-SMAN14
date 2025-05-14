import Logo18 from "../assets/logo18.jpg";

export default function Alert({
  type = "success",
  title = "Berhasil",
  message = "Data berhasil diproses",
  onClose,
  buttonLabel = "OK",
}) {
  const typeStyles = {
    success: {
      icon: (
        <img src={Logo18} alt="Success" className="h-32 w-32 object-contain" />
      ),
      text: "text-green-700",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    error: {
      icon: "❌",
      text: "text-red-700",
      button: "bg-red-500 hover:bg-red-600 text-white",
    },
    warning: {
      icon: "⚠️",
      text: "text-yellow-700",
      button: "bg-yellow-500 hover:bg-yellow-600 text-white",
    },
    info: {
      icon: "ℹ️",
      text: "text-blue-700",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
    },
  };

  const style = typeStyles[type] || typeStyles.success;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 p-4 sm:p-0">
      <div className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg w-full max-w-xs sm:max-w-sm">
        <h2
          className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${style.text}`}
        >
          {title}
        </h2>

        <div className="flex justify-center mb-3 sm:mb-4 text-3xl sm:text-4xl">
          {style.icon}
        </div>

        <p className="text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6 px-2">
          {message}
        </p>

        <button
          onClick={onClose}
          className={`w-full py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${style.button}`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
