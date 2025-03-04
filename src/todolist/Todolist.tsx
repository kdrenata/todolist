import {Button} from "../Button.tsx";
import {FilterValues} from "../App.tsx";
import {useState, KeyboardEvent, ChangeEvent} from "react";
import style from './Todolist.module.css'

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
                             deleteTodolist
                         }: TodolistPropsType) => {
    // const {title, tasks} = props   // деструктурирующее присваивание

    // const inputRef = useRef<HTMLInputElement>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');  // локальный state, который контролирует input
    const [error, setError] = useState<boolean>(false);

// условный рендеринг (отоброжаем тот или иной элемент разметки в зависимости от какого-то условия)
    const tasksList = tasks.length === 0   //проверяем есть ли данные в массиве, если равна 0,
        ? <span>Ваш список пуст</span>           // то выводим сообщение и список не генерируем // если не равна                                                                                0, то генерируем список
        : <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(task.id, todolistId)
                return (
                    <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                        <input
                            onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)} // элемент с которым произошло событие
                            type="checkbox"
                            checked={task.isDone}/>
                        <span>{task.title}</span>
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

    const createTaskOnClickHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(trimmedTitle, todolistId);
        } else {
            setError(true);
        }
        createTask(taskTitle, todolistId)
        setTaskTitle('')
    }
    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {   // добавление по нажатию на клавишу
        if (e.key === 'Enter' && taskTitle && taskTitle.length <= 15) {   // то же самое что при нажатии на кнопку
            createTaskOnClickHandler()
        }
    }
    const createTaskOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }

    return (
        <div className={style.todolist}>
            <h3>
                {title}
                <Button title='x' onClickHandler={() => deleteTodolist(todolistId)}/>
            </h3>

            <div>
                <input //  получает содержимое локального state(a)
                    value={taskTitle}
                    placeholder='max length is 15 charters...'
                    onChange={createTaskOnChangeHandler} //все что польз вводит, поручаем передавать в локальный state
                    onKeyDown={createTaskOnKeyDownHandler} //клавиша нажата, но не отпущена вверх
                    className={error ? 'taskInputError' : ''}
                />
                <Button title={'+'}
                        isDisabled={!taskTitle || taskTitle.length > 15}
                        onClickHandler={createTaskOnClickHandler}/>

            </div>
            {/*// добавляем два выражения условного рендеринга*/}
            {taskTitle && taskTitle.length <= 15 && <div>max title length is 15 charters</div>}
            {taskTitle.length > 15 && <div style={{color: '#cd2828'}}>title is to long</div>}
            {error && <div style={{color: '#cd2828'}}>enter valid title</div>}

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