import { useState, useEffect } from "react";

function ExpenseForm({ addExpense, updateExpense, editingExpense, setEditingExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date.split('T')[0]);
      setNotes(editingExpense.notes || "");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !category || !date) {
      alert("Please fill in all required fields!");
      return;
    }

    if (amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString(),
      notes
    };

    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      addExpense(expenseData);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
    setNotes("");
    setEditingExpense(null);
  };

  const categories = ["Food", "Transport", "Shopping", "Entertainment", "Bills", "Healthcare", "Education", "Other"];

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{editingExpense ? "✏️ Edit Expense" : "➕ Add New Expense"}</h3>
      
      <div className="form-row">
        <input
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        
        <input
          type="number"
          placeholder="Amount *"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-input"
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-row">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="form-input"
        rows="2"
      />

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
        {editingExpense && (
          <button type="button" onClick={resetForm} className="btn-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ExpenseForm;