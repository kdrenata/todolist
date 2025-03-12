import {FilterValues} from "../App.tsx";
import style from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {getListItemSx} from "../TodolistItem.styles.ts";

import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';


type TodolistPropsType = {          // тип, который описывает пропсы компонента тудулист
    todolistId: string;
    title: string;
    tasks: Array<TaskType>;
    filter?: FilterValues;

    deleteTask: (taskId: string, todolistId: string) => void;
    createTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void;

    changeTodolistFilter: (newFilterValue: FilterValues, todolistId: string) => void;
    deleteTodolist: (todolistsId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
    changeTodolistTitle: (newTitle: string, todolistsId: string) => void;
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             filter,
                             deleteTask,
                             createTask,
                             changeTaskStatus,
                             changeTodolistFilter,
                             deleteTodolist,
                             changeTaskTitle,
                             changeTodolistTitle
                         }: TodolistPropsType) => {
    // const {title, tasks} = props   // деструктурирующее присваивание


// условный рендеринг (отоброжаем тот или иной элемент разметки в зависимости от какого-то условия)
    const tasksList = tasks.length === 0   //проверяем есть ли данные в массиве, если равна 0,
        ? <span>Ваш список пуст</span>           // то выводим сообщение и список не генерируем // если не равна                                                                                0, то генерируем список
        : <List>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(task.id, todolistId)
                const changeTitleCallback = (newTitle: string) => {
                    changeTaskTitle(task.id, newTitle, todolistId)
                }
                return (
                    <ListItem
                        disablePadding
                        sx={getListItemSx(task.isDone)}
                        key={task.id}>
                        <Box>
                            <Checkbox
                                size="small"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}/>

                            <EditableSpan title={task.title} changeTitle={changeTitleCallback}/>
                        </Box>
                        <IconButton
                            // color='primary'
                            size='small'
                            onClick={deleteTaskHandler}>
                            <DeleteIcon
                                fontSize='inherit'/>
                        </IconButton>

                    </ListItem>
                )
            })}
            </List>
// С ЦИКЛОМ
// let taskList = <span>Ваш список пуст</span>;
// if (props.tasks.length) {
//     taskList = <ul>
//         {props.tasks.map(task => {
//             return (
//                 <li>
//                     <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
//                 </li>
//             )
//         })}
//     </ul>
// }
const createTaskCallback = (newTaskTitle: string) => {
    createTask(newTaskTitle, todolistId);
}
const changeTodolistTitleCallback = (newTitle: string) => {
    changeTodolistTitle(newTitle, todolistId)
}
const deleteTodolistHandler = () => {
    deleteTodolist(todolistId)
}
return (
    <div className={style.todolist}>
        <Typography
            variant='h6'
            textAlign='center'
            sx={{p:'10px', fontWeight: 700}}>
            <EditableSpan title={title} changeTitle={changeTodolistTitleCallback}/>
            <IconButton
                size='small'>
                <DeleteIcon
                    fontSize='inherit'
                    onClick={deleteTodolistHandler}/>
            </IconButton>
        </Typography>
        <AddItemForm createItem={createTaskCallback} maxTitleLength={15}/>
        {tasksList}

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={() => changeTodolistFilter("all", todolistId)}
                color={filter === "all" ? "secondary" : "primary"}>
                All
            </Button>
            <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={() => changeTodolistFilter('active', todolistId)}
                color={filter === "active" ? "secondary" : "primary"}>
                Active
            </Button>
            <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={() => changeTodolistFilter('completed', todolistId)}
                color={filter === "completed" ? "secondary" : "primary"}>
                Completed
            </Button>
        </Box>
    </div>
)
}