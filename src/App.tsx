import './App.css'
import {TaskType, Todolist} from "./todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}
type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

// CRUD creat read update delete
function App() {

// BLL: операции с CRUD данными
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Milk', isDone: false}
        ]
    })

// previous state
// const todolistTitle = 'What to learn'
//
// const [tasks, setTasks] = useState<Array<TaskType>>([   // useState возвращает нам массив из 2-х элементов и мы этот массив деструктуируем (разламываем) на 2 части
//     {id: v1(), title: 'HTML&CSS', isDone: true},
//     {id: v1(), title: 'JS', isDone: true},
//     {id: v1(), title: 'ReactJS', isDone: false},
// ])

    const deleteTask = (taskId: string, todolistId: string) => {
        const nextState = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(nextState)

    }

    const createTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: TasksStateType = {...tasks, [todolistId]: [...tasks[todolistId], newTask]}
        setTasks(nextState)

    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistId: string) => {      // реализация задачи смены статуса

        const nextState: TasksStateType = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        }
        setTasks(nextState)

    }

    const changeTodolistFilter = (newFilterValue: FilterValues, todolistId: string) => {

        const nextState: Array<TodolistType> = todolists
            .map(tl => tl.id === todolistId ? {...tl, filter: newFilterValue} : tl)
        setTodolists(nextState)
    }

// UI: // порядок отображения данных

    const todolistsComponents = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true)
        }

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                filter={tl.filter}
                deleteTask={deleteTask}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                changeTodolistFilter={changeTodolistFilter}
            />
        )
    })


    return (
        <div className="app">
            {todolistsComponents}
        </div>
    )

}

export default App
