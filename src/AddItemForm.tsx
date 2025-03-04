import {Button} from "./Button.tsx";
import {KeyboardEvent, useState} from "react";

type Props = {
    createItem: (newTitle: string) => void;
    maxTitleLength: number;
}

export const AddItemForm = ({createItem, maxTitleLength}: Props) => {

    const [taskTitle, setTaskTitle] = useState<string>('');  // локальный state, который контролирует input
    const [error, setError] = useState<boolean>(false);

    const createTaskOnClickHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle);
        } else {
            setError(true);
        }
        setTaskTitle('')
    }
    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {   // добавление по нажатию на клавишу
        if (e.key === 'Enter' && taskTitle && taskTitle.length <= 15) {   // то же самое что при нажатии на кнопку
            createTaskOnClickHandler()
        }
    }

    return (
        <div>
            <input //  получает содержимое локального state(a)
                value={taskTitle}
                placeholder={`max length - ${maxTitleLength} charters...`}
                onChange={(e) => {
                    error && setError(false)
                    setTaskTitle(e.currentTarget.value)
                }}  //все что польз вводит, поручаем передавать в локальный state
                onKeyDown={createTaskOnKeyDownHandler} //клавиша нажата, но не отпущена вверх
                className={error ? 'taskInputError' : ''}
            />
            <Button title={'+'}
                    isDisabled={!taskTitle || taskTitle.length > 15}
                    onClickHandler={createTaskOnClickHandler}/>
            {taskTitle && taskTitle.length <= maxTitleLength && <div>{`max title length is ${maxTitleLength} charters`}</div>}
            {taskTitle.length > maxTitleLength && <div style={{color: '#cd2828'}}>title is to long</div>}
            {error && <div style={{color: '#cd2828'}}>enter valid title</div>}

        </div>
    )
}