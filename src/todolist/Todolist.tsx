import {Button} from "./Button.tsx";
import {FilterValues} from "../App.tsx";
import style from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

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
        : <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(task.id, todolistId)
                const changeTitleCallback = (newTitle: string) => {
                    changeTaskTitle(task.id, newTitle, todolistId)
                }
                return (
                    <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                        <input
                            onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)} // элемент с которым произошло событие
                            type="checkbox"
                            checked={task.isDone}/>
                        {/*<span>{task.title}</span>*/}
                        <EditableSpan title={task.title} changeTitle={changeTitleCallback}/>
                        <Button title='x' onClickHandler={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>
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

    return (
        <div className={style.todolist}>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleCallback}/>
                <Button title='x' onClickHandler={() => deleteTodolist(todolistId)}/>
            </h3>
            <AddItemForm createItem={createTaskCallback} maxTitleLength={20}/>

            {tasksList}
            <div>
                <Button
                    title={'All'}
                    className={filter === 'all' ? 'filter-btn-active' : ''}
                    onClickHandler={() => changeTodolistFilter('all', todolistId)}/>
                <Button
                    title={'Active'}
                    className={filter === 'active' ? 'filter-btn-active' : ''}
                    onClickHandler={() => changeTodolistFilter('active', todolistId)}/>
                <Button
                    title={'Completed'}
                    className={filter === 'completed' ? 'filter-btn-active' : ''}
                    onClickHandler={() => changeTodolistFilter('completed', todolistId)}/>
            </div>
        </div>
    )
}