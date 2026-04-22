import { useEffect, useState } from "react";
import axios from "../api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title:"",
    amount:"",
    category:"Food"
  });
  const [filter, setFilter] = useState("");

  const fetchExpenses = async () => {
    const res = await axios.get("/expense", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setExpenses(res.data);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    await axios.post("/expense", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = filter
    ? expenses.filter(exp => exp.category === filter)
    : expenses;

  const totalExpense = filteredExpenses.reduce((acc, item) => acc + item.amount, 0);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <form onSubmit={addExpense} className="grid grid-cols-3 gap-3 mb-6">
          <input placeholder="Title" className="border p-2"
            onChange={(e)=>setForm({...form,title:e.target.value})}/>
          <input placeholder="Amount" type="number" className="border p-2"
            onChange={(e)=>setForm({...form,amount:e.target.value})}/>
          <select className="border p-2"
            onChange={(e)=>setForm({...form,category:e.target.value})}>
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
          </select>
          <button className="bg-blue-600 text-white py-2 rounded col-span-3">
            Add Expense
          </button>
        </form>

        <div className="mb-4">
          <select className="border p-2" onChange={(e)=>setFilter(e.target.value)}>
            <option value="">All</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
          </select>
        </div>

        <h2 className="text-xl font-semibold mb-4">
          Total Expense: ₹{totalExpense}
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(exp => (
              <tr key={exp._id}>
                <td className="p-2">{exp.title}</td>
                <td className="p-2">₹{exp.amount}</td>
                <td className="p-2">{exp.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}