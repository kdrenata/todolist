import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";

// CRUD creat read update delete



function App() {
    // DATA:
    const todolistTitle_1 = 'What to learn'
    const todolistTitle_2 = 'What to buy'
    const tasks_1: Array<TaskType> = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
    ]
    const tasks_2: TaskType[] = [
        // {id: 4, title: 'Milk', isDone: true},
        // {id: 5, title: 'Bread', isDone: true},
        // {id: 6, title: 'Meat', isDone: false},
    ]

    // UI:
  return (
      <div className="app">
        <Todolist
            title={todolistTitle_1}
            tasks={tasks_1}
        />
        <Todolist
            title={todolistTitle_2}
            tasks={tasks_2}
        />
      </div>
  )
}

export default App
