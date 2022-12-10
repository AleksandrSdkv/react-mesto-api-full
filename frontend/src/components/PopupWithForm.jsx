export default function PopupWithForm(props) {
    const { name, title, isOpen, textBtn, onClose, onSubmit } = props

    return (
        <div className={`popup popup_type_${name} ${isOpen}`} >
            <div className="popup__container">
                <button className="popup__button-close popup__close" type="button" onClick={onClose}></button>
                <form className={`form" name="popup-form-${name}`}>
                    <h2 className="form__title">{title}</h2>
                    <fieldset className="form__group">
                        {props.children}
                        <button className="form__bottom-submit" type="submit" onClick={onSubmit}>{textBtn}</button>
                    </fieldset>
                </form>
            </div>
        </ div>
    )
}
