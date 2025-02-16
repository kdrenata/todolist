import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = 'all' | 'active' | 'completed'


// CRUD creat read update delete
function App() {
    console.log(typeof v1());

    // BLL: операции с CRUD данными
    const todolistTitle = 'What to learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([   // useState возвращает нам массив из 2-х элементов и мы этот массив деструктуируем (разламываем) на 2 части
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])
    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))  // все таски кроме той которую нужно удалить
    }
    const createTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: Array<TaskType> = [...tasks, newTask]
        setTasks(nextState)
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
                createTask={createTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
