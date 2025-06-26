import { useState, useEffect } from 'react'

function App() {
  // State management for todos and input
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // Load todos from localStorage on initial render
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage when they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Add new todo
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }])
      setInput('')
    }
  }

  // Toggle todo completion status
  const toggleTodo = (index) => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  // Delete todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Todo PWA</h1>
      
      {/* Todo input form */}
      <div className="flex mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      
      {/* Todo list */}
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li 
            key={index} 
            className={`flex items-center justify-between p-3 rounded-lg ${todo.completed ? 'bg-green-50' : 'bg-gray-50'}`}
          >
            <span 
              onClick={() => toggleTodo(index)}
              className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(index)}
              className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* Todo statistics */}
      {todos.length > 0 && (
        <div className="mt-4 text-center text-gray-600">
          {todos.filter(t => !t.completed).length} remaining out of {todos.length} tasks
        </div>
      )}
    </div>
  )
}

export default App