import { useState } from 'react'
import './App.css'
import TodosPage from "./page/todosPage/TodosPage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <h2>Azamat</h2>
        <TodosPage/>
    </>
  )
}

export default App
