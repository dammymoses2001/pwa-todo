
import { useState, useEffect } from 'react'

function HomePage() {
  // State management for todos, input, and online status
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [syncStatus, setSyncStatus] = useState('synced') // 'synced', 'pending', 'error'

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      syncData()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

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
    if (isOnline) {
      syncData()
    } else {
      setSyncStatus('pending')
    }
  }, [todos, isOnline])

  // Sync data with backend (mock function)
  const syncData = async () => {
    if (!isOnline) return
    
    try {
      setSyncStatus('syncing')
      // Mock API call - replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 500))
      setSyncStatus('synced')
    } catch (error) {
      console.error('Sync failed:', error)
      setSyncStatus('error')
    }
  }

  // Add new todo
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false, id: Date.now() }])
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
      
      {/* Connection status */}
      <div className={`text-sm text-center mb-4 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
        {syncStatus === 'pending' && ' (Changes pending)'}
        {syncStatus === 'syncing' && ' (Syncing...)'}
        {syncStatus === 'error' && ' (Sync failed)'}
      </div>

      {/* Todo input form */}
      <div className="flex mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo"
          className="flex-1 px-4 py-2 border rounded-l focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Add
        </button>
      </div>

      {/* Todo list */}
      <ul className="space-y-3">
        {todos.map((todo, index) => (
          <li
            key={todo.id || index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="mr-3"
              />
              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No todos yet. Add one above!</p>
      )}
    </div>
  )
}

export default HomePage
