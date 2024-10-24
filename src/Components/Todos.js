
import { useEffect, useState } from 'react';
import './App.css'

function Todos() {
  const [items, setItems] = useState([]); // State to store fetched todos
  const [completedCount, setCompletedCount] = useState(0); // State for completed todos count
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    // Fetch todos data
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        setItems(data);
        console.log(data);
        setPageCount(Math.ceil(data.length / pageSize));
        setCurrentItems(data.slice(0, pageSize)); // Set initial items

        // Calculate completed todos and update the count
        const completedTodos = data.filter(todo => todo.completed === true);
        setCompletedCount(completedTodos.length); // Set the completed count

      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [pageSize]); // Add pageSize as a dependency to refetch if it changes

  const onPageChange = (index) => {
    setCurrentPage(index);
    const newItems = items.slice(index * pageSize, (index + 1) * pageSize);
    setCurrentItems(newItems);
  };

  return (
    <div>
      <h1>React Pagination - Todos</h1>
      <p>Completed Todos Count: {completedCount}</p> {/* Display count of completed todos */}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        <button onClick={() => onPageChange(0)} disabled={currentPage === 0}>First</button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>Prev</button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button 
            key={index} 
            onClick={() => onPageChange(index)} 
            className={currentPage === index ? 'active-btn' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pageCount - 1}>Next</button>
        <button onClick={() => onPageChange(pageCount - 1)} disabled={currentPage === pageCount - 1}>Last</button>
        <label>Page Size: </label>
        <select value={pageSize} onChange={(e) => {
          const newPageSize = parseInt(e.target.value);
          setPageSize(newPageSize);
          const newPageCount = Math.ceil(items.length / newPageSize);
          setPageCount(newPageCount);
          setCurrentItems(items.slice(0, newPageSize)); // Reset to first page
          setCurrentPage(0); // Reset current page
        }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}

export default Todos;

