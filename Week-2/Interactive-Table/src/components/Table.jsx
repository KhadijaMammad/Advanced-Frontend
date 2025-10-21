import React, { useState, useMemo } from 'react';
import "../assets/styles/index.css";


// Fake user data generator
const generateFakeUsers = (count = 50) => {
  const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Robert', 'Mia', 'David', 'Charlotte', 'Richard', 'Amelia', 'Charles', 'Harper', 'Thomas', 'Evelyn', 'Daniel', 'Abigail'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'IT', 'Operations', 'Product', 'Design', 'Support'];
  const statuses = ['Active', 'Inactive', 'Pending'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${index + 1}@example.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    age: Math.floor(Math.random() * 40) + 20,
    salary: Math.floor(Math.random() * 80000) + 30000,
    city: cities[Math.floor(Math.random() * cities.length)],
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-US')
  }));
};

const InteractiveTable = () => {
  const [users, setUsers] = useState(generateFakeUsers(50));
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filter, setFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    department: true,
    status: true,
    age: true,
    salary: true,
    city: true,
    joinDate: true
  });

  // Filtered and sorted data
  const processedUsers = useMemo(() => {
    let filteredUsers = users;

    // Apply filter
    if (filter) {
      filteredUsers = users.filter(user =>
        Object.values(user).some(value =>
          value.toString().toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    // Apply sorting - FIXED: null check added
    if (sortConfig.key) {
      filteredUsers = [...filteredUsers].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredUsers;
  }, [users, filter, sortConfig]);

  // Column definitions
  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'firstName', label: 'First Name', sortable: true },
    { key: 'lastName', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'salary', label: 'Salary', sortable: true },
    { key: 'city', label: 'City', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true }
  ];

  // Event handlers
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectRow = (userId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === processedUsers.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(processedUsers.map(user => user.id)));
    }
  };

  const handleBatchAction = (action) => {
    if (selectedRows.size === 0) return;

    switch (action) {
      case 'delete':
        setUsers(users.filter(user => !selectedRows.has(user.id)));
        setSelectedRows(new Set());
        break;
      case 'markActive':
        setUsers(users.map(user =>
          selectedRows.has(user.id) ? { ...user, status: 'Active' } : user
        ));
        break;
      case 'markInactive':
        setUsers(users.map(user =>
          selectedRows.has(user.id) ? { ...user, status: 'Inactive' } : user
        ));
        break;
      default:
        break;
    }
  };

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Inactive': return 'status-inactive';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  // Fix for indeterminate checkbox
  const selectAllCheckboxRef = React.useRef(null);
  
  React.useEffect(() => {
    if (selectAllCheckboxRef.current) {
      selectAllCheckboxRef.current.indeterminate = 
        selectedRows.size > 0 && selectedRows.size < processedUsers.length;
    }
  }, [selectedRows, processedUsers.length]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Management</h1>
        <p>Interactive Table with {users.length} Users</p>
      </header>

      <div className="controls">
        {/* Search Filter */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Column Toggles */}
        <div className="column-controls">
          <div className="dropdown">
            <button className="dropdown-toggle">Columns 👁️</button>
            <div className="dropdown-content">
              {columns.map(column => (
                <label key={column.key} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={visibleColumns[column.key]}
                    onChange={() => toggleColumn(column.key)}
                  />
                  {column.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Batch Actions */}
        {selectedRows.size > 0 && (
          <div className="batch-actions">
            <span className="selected-count">{selectedRows.size} selected</span>
            <button
              onClick={() => handleBatchAction('delete')}
              className="btn btn-danger"
            >
              🗑️ Delete
            </button>
            <button
              onClick={() => handleBatchAction('markActive')}
              className="btn btn-success"
            >
              ✅ Mark Active
            </button>
            <button
              onClick={() => handleBatchAction('markInactive')}
              className="btn btn-warning"
            >
              ⚠️ Mark Inactive
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="checkbox-cell">
                <input
                  ref={selectAllCheckboxRef}
                  type="checkbox"
                  checked={selectedRows.size === processedUsers.length && processedUsers.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map(column => (
                visibleColumns[column.key] && (
                  <th
                    key={column.key}
                    onClick={() => column.sortable && handleSort(column.key)}
                    className={column.sortable ? 'sortable' : ''}
                  >
                    <div className="th-content">
                      {column.label}
                      {column.sortable && (
                        <span className="sort-indicator">
                          {sortConfig.key === column.key && (
                            sortConfig.direction === 'asc' ? '↑' : '↓'
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {processedUsers.length > 0 ? (
              processedUsers.map(user => (
                <tr
                  key={user.id}
                  className={selectedRows.has(user.id) ? 'selected' : ''}
                >
                  <td className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(user.id)}
                      onChange={() => handleSelectRow(user.id)}
                    />
                  </td>
                  {columns.map(column => (
                    visibleColumns[column.key] && (
                      <td key={column.key}>
                        {column.key === 'status' ? (
                          <span className={`status-badge ${getStatusBadgeClass(user[column.key])}`}>
                            {user[column.key]}
                          </span>
                        ) : column.key === 'salary' ? (
                          `$${user[column.key].toLocaleString()}`
                        ) : (
                          user[column.key]
                        )}
                      </td>
                    )
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.filter(col => visibleColumns[col.key]).length + 1} className="no-data">
                  No users found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Info */}
      <div className="table-info">
        <p>
          Showing {processedUsers.length} of {users.length} users
          {filter && ` (filtered by "${filter}")`}
        </p>
      </div>
    </div>
  );
};

export default InteractiveTable;