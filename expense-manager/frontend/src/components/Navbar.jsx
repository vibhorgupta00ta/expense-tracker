import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Expense Manager</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}