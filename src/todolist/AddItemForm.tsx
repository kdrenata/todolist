
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
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
    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemTitle(e.currentTarget.value)
    }

    return (
        <div>
            <TextField //  получает содержимое локального state(a)
                variant="outlined"
                size="small"
                value={itemTitle}
                placeholder={`max length - ${maxTitleLength} charters...`}
                onChange={changeItemTitleHandler}  //все что польз вводит, поручаем передавать в локальный state
                onKeyDown={createTaskOnKeyDownHandler} //клавиша нажата, но не отпущена вверх
                error={error}
                helperText={error && 'Enter valid title'}/>
                {/*// className={error ? 'taskInputError' : ''}*/}

            <IconButton
                size='large'
                sx={{p: '8px 0 0 10px'}}
                disabled={!itemTitle || itemTitle.length > 15}
                onClick={createItemHandler}

            >
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>
            {itemTitle && itemTitle.length <= maxTitleLength && <div>{`max title length is ${maxTitleLength} charters`}</div>}
            {itemTitle.length > maxTitleLength && <div style={{color: '#cd2828'}}>title is to long</div>}
            {/*{error && <div style={{color: '#cd2828'}}>enter valid title</div>}*/}

        </div>
    )
}