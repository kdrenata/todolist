type Props = {
    title: string
    onClickHandler?: () => void // функция без return, void - пустота
    isDisabled?: boolean
}
export const Button = ({ title, onClickHandler, isDisabled }: Props) => {
    return (
        <button disabled={isDisabled} onClick={onClickHandler}>{title}</button>
    )
}