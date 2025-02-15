import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";

type TodolistPropsType = {          // тип, который описывает пропсы компонента тудулист
    title: string;
    tasks: Array<TaskType>;
    deleteTask: (taskId: number) => void;
    changeFilter: (newFilterValue: FilterValues) => void;
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export const Todolist = ({title, tasks, deleteTask, changeFilter}: TodolistPropsType) => {
    // const {title, tasks} = props   // деструктурирующее присваивание


// условный рендеринг (отоброжаем тот или иной элемент разметки в зависимости от какого-то условия)
    const tasksList = tasks.length === 0   //проверяем есть ли данные в массиве, если равна 0,
        ? <span>Ваш список пуст</span>           // то выводим сообщение и список не генерируем // если не равна                                                                                0, то генерируем список
        : <ul>
            {tasks.map(task => {
                const showTaskId = () => deleteTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title='x' onClickHandler={showTaskId}/>
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
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'x'}/>
            </div>
            {tasksList}
            <div>
                <Button title={'All'} onClickHandler={() => changeFilter('all')}/>
                <Button title={'Active'} onClickHandler={() => changeFilter('active')}/>
                <Button title={'Completed'} onClickHandler={() => changeFilter('completed')}/>
            </div>
        </div>
    )
}