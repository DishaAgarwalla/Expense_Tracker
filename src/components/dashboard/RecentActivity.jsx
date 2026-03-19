function RecentActivity({ expenses }) {
  if (expenses.length === 0) {
    return (
      <div className="activity-card">
        <h3>Recent Activity</h3>
        <p>No recent expenses</p>
      </div>
    )
  }

  const getIcon = (category) => {
    const icons = {
      Food: '🍔',
      Transport: '🚗',
      Shopping: '🛍️',
      Entertainment: '🎬',
      Bills: '📄',
      Healthcare: '🏥',
      Education: '📚',
      Other: '📌'
    }
    return icons[category] || '📌'
  }

  return (
    <div className="activity-card">
      <h3>Recent Activity</h3>
      <div className="activity-list">
        {expenses.map(expense => (
          <div key={expense.id} className="activity-item">
            <div className="activity-icon">{getIcon(expense.category)}</div>
            <div className="activity-details">
              <span className="activity-title">{expense.title}</span>
              <span className="activity-category">{expense.category}</span>
            </div>
            <div className="activity-amount">
              ₹{expense.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity