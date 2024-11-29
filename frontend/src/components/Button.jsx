
function Button({ label, onClick, icon, className }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-1 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 ${className}`}
      type="submit"
    >
      <span>{label}</span>
      {icon && <span className="text-xl">{icon}</span>}
    </button>
  );
}

export default Button;
