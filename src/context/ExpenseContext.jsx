import React, { createContext, useState, useContext, useEffect } from 'react'

const ExpenseContext = createContext()

export function useExpenses() {
  return useContext(ExpenseContext)
}

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })
  const [budgets, setBudgets] = useState({})

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }])
  }

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...updatedExpense, id } : exp))
  }

  const deleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(exp => exp.id !== id))
    }
  }

  const getBudgetStatus = () => {
    const status = {}
    expenses.forEach(exp => {
      if (!status[exp.category]) {
        status[exp.category] = {
          spent: 0,
          budget: budgets[exp.category] || 0,
          percentage: 0,
          remaining: 0
        }
      }
      status[exp.category].spent += exp.amount
    })
    
    Object.keys(status).forEach(cat => {
      const budget = budgets[cat] || 0
      status[cat].percentage = budget > 0 ? (status[cat].spent / budget) * 100 : 0
      status[cat].remaining = budget - status[cat].spent
    })
    
    return status
  }

  const value = {
    expenses,
    budgets,
    addExpense,
    updateExpense,
    deleteExpense,
    getBudgetStatus
  }

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  )
}