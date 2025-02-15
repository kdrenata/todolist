type Props = {
    title: string
    onClickHandler?: () => void // функция без return, void - пустота
}

export const Button = ({ title, onClickHandler }: Props) => {
    return (
        <button onClick={onClickHandler}>{title}</button>
    )
}