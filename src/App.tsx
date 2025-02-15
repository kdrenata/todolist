import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";

export type FilterValues = 'all' | 'active' | 'completed'


// CRUD creat read update delete
function App() {

    // DATA: операции с CRUD данными
    const todolistTitle = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([   // useState возвращает нам массив из 2-х элементов и мы этот массив деструктуируем (разламываем) на 2 части
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])
    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))  // все таски кроме той которую нужно удалить
    }

    // UI: // порядок отображения данных
    const [filter, setFilter] = useState<FilterValues>('all')

    const changeFilter = (newFilterValue: FilterValues) => {
        setFilter(newFilterValue)
    }

    let tasksForTodolist = tasks

    if(filter === 'active'){
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }


    return (
        <div className="app">
            <Todolist
                title={todolistTitle}
                tasks={tasksForTodolist}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
