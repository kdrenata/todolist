import {FilterValues} from "../App.tsx";
import style from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {getListItemSx} from "../TodolistItem.styles.ts";


import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import {FilterButton} from "./FilterButton.ts";
import {useState} from "react";


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
                        divider
                        sx={getListItemSx(task.isDone)}
                        key={task.id}>
                        <Box>
                            <Checkbox
                                size="medium"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}/>

                            <EditableSpan title={task.title} changeTitle={changeTitleCallback}/>
                        </Box>
                        <IconButton
                            // color='primary'
                            size='medium'
                            onClick={deleteTaskHandler}>
                            <HighlightOffOutlinedIcon
                                sx={{color: 'darkgray'}}
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
const [activeFilter, setActiveFilter] = useState(filter || "all");
const handleFilterChange = (newFilter: FilterValues) => {
    setActiveFilter(newFilter);
    changeTodolistFilter(newFilter, todolistId);
};
return (
    <div className={style.todolist}>
        <Typography
            variant='h6'
            textAlign='center'
            sx={{p:'10px', fontWeight: 700, color: 'primary.main'}}>
            <EditableSpan title={title} changeTitle={changeTodolistTitleCallback}/>
            <IconButton
                size='small'>
                <HighlightOffOutlinedIcon
                    sx={{color: "#2196f3", ml: '5px'}}
                    fontSize='inherit'
                    onClick={deleteTodolistHandler}/>
            </IconButton>
        </Typography>
        <AddItemForm createItem={createTaskCallback} maxTitleLength={15}/>
        {tasksList}

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <FilterButton
                background={activeFilter === "all" ? "#3f51b5" : "#2196f3"}
                variant="contained"
                size="small"
                disableElevation
                onClick={() => handleFilterChange("all")}
                color={activeFilter  === "all" ? "secondary" : "primary"}>
                All
            </FilterButton>
            <FilterButton
                background={activeFilter === "active" ? "#3f51b5" : "#2196f3"}
                variant="contained"
                size="small"
                disableElevation
                onClick={() => handleFilterChange('active')}
                color={activeFilter  === "active" ? "secondary" : "primary"}>
                Active
            </FilterButton>
            <FilterButton
                background={activeFilter === "completed" ? "#3f51b5" : "#2196f3"}
                variant="contained"
                size="small"
                disableElevation
                onClick={() => handleFilterChange('completed')}
                color={activeFilter  === "completed" ? "secondary" : "primary"}>
                Completed
            </FilterButton>
        </Box>
    </div>
)
}