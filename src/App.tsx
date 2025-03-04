import './App.css'
import {TaskType, Todolist} from "./todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm.tsx";

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

    const deleteTask = (taskId: string, todolistsId: string) => {
        const nextState = {...tasks, [todolistsId]: tasks[todolistsId].filter(t => t.id !== taskId)}
        setTasks(nextState)

    }

    const createTask = (title: string, todolistsId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: TasksStateType = {...tasks, [todolistsId]: [...tasks[todolistsId], newTask]}
        setTasks(nextState)

    }

    const changeTaskStatus = (taskId: string, newStatus: boolean, todolistsId: string) => {      // реализация задачи смены статуса

        const nextState: TasksStateType = {
            ...tasks,
            [todolistsId]: tasks[todolistsId].map(task => task.id === taskId ? {...task, isDone: newStatus} : task)
        }
        setTasks(nextState)

    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistsId: string) => {
        const nextState: TasksStateType = {
            ...tasks,
            [todolistsId]: tasks[todolistsId].map(task => task.id === taskId ? {...task, title: newTitle} : task)
        }
        setTasks(nextState)
    }

    const changeTodolistFilter = (newFilterValue: FilterValues, todolistsId: string) => {

        const nextState: Array<TodolistType> = todolists
            .map(tl => tl.id === todolistsId ? {...tl, filter: newFilterValue} : tl)
        setTodolists(nextState)
    }

    const deleteTodolist = (todolistsId: string) => {
        const nextState: Array<TodolistType> = todolists.filter(tl => tl.id !== todolistsId)
            setTodolists(nextState)
        //
        delete tasks[todolistsId]
        //
        // const nextTasksState = {...tasks}
        // delete nextTasksState[todolistsId]
        // setTasks(nextTasksState)
    }


    const creatTodolist = (newTodoTitle: string) => {
        const newTodolistId = v1()
        const nextState: Array<TodolistType> = [...todolists, {id: newTodolistId, title: newTodoTitle, filter: 'all'}]
        setTodolists(nextState)

        const nextTasksState: TasksStateType = {...tasks, [newTodolistId]: []}
        setTasks(nextTasksState)
    }

    const changeTodolistTitle = (newTitle: string, todolistsId: string) => {
        const nextState: Array<TodolistType> = todolists
            .map(tl => tl.id === todolistsId ? {...tl, title: newTitle} : tl)
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
                deleteTodolist={deleteTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}

            />
        )
    })


    return (
        <div className="app">
            <AddItemForm createItem={creatTodolist} maxTitleLength={15}/>
            {todolistsComponents}
        </div>
    )

}

export default App
