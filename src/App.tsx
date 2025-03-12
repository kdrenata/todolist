import './App.css'
import {TaskType, Todolist} from "./todolist/Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./todolist/AddItemForm.tsx";
import {NavButton} from "./todolist/NavButton.ts";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import Switch from '@mui/material/Switch';




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
            {id: v1(), title: 'JavaScript', isDone: true},
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
            <Grid2 key={tl.id}>
                <Paper
                    sx={{p: '15px'}}
                    elevation={8}>
                    <Todolist
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
                </Paper>
            </Grid2>
        )
    })

    const [darkMode, setDarkMode] = useState(false)

    const theme = createTheme({
        palette: {
            primary: {
                main: '#007bb2'
            },
            secondary: {
                main: '#ab003c',
            },
            mode: darkMode ? 'dark' : 'light',
        },
        typography: {
            fontFamily: '"Playfair Display", serif',
        },
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box>
                            <NavButton>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton background={theme.palette.primary.light}>Faq</NavButton>
                            <Switch onChange={() => setDarkMode(!darkMode)}/>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid2 container sx={{p: '25px 0'}}>
                        <AddItemForm createItem={creatTodolist} maxTitleLength={15}/>
                    </Grid2>
                    <Grid2 container spacing={4}>
                        {todolistsComponents}
                    </Grid2>
                </Container>
            </ThemeProvider>
        </div>
    )

}

export default App
