
import {KeyboardEvent, useState} from "react";
import {IconButton} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from "@mui/material/TextField";

type Props = {
    createItem: (newTitle: string) => void;
    maxTitleLength: number;
}

export const AddItemForm = ({createItem, maxTitleLength}: Props) => {

    const [itemTitle, setItemTitle] = useState<string>('');  // локальный state, который контролирует input
    const [error, setError] = useState<boolean>(false);

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle);
        } else {
            setError(true);
        }
        setItemTitle('')
    }
    const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {   // добавление по нажатию на клавишу
        if (e.key === 'Enter' && itemTitle && itemTitle.length <= 15) {   // то же самое что при нажатии на кнопку
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField //  получает содержимое локального state(a)
                variant="outlined"
                size="small"
                value={itemTitle}
                placeholder={`max length - ${maxTitleLength} charters...`}
                onChange={(e) => {
                    error && setError(false)
                    setItemTitle(e.currentTarget.value)
                }}  //все что польз вводит, поручаем передавать в локальный state
                onKeyDown={createTaskOnKeyDownHandler} //клавиша нажата, но не отпущена вверх
                error={error}
                helperText={error && 'Enter valid title'}
                // className={error ? 'taskInputError' : ''}
            />
            <IconButton
                disabled={!itemTitle || itemTitle.length > 15}
                onClick={createItemHandler}
            >
                <AddCircleOutlineIcon/>
            </IconButton>
            {itemTitle && itemTitle.length <= maxTitleLength && <div>{`max title length is ${maxTitleLength} charters`}</div>}
            {itemTitle.length > maxTitleLength && <div style={{color: '#cd2828'}}>title is to long</div>}
            {/*{error && <div style={{color: '#cd2828'}}>enter valid title</div>}*/}

        </div>
    )
}