import confirmNo from '../image/img-confirm-NO.png';
import confirmYes from '../image/img-confirm-OK.png';
function InfoTooltip(props) {

    const { isOpen, onClose, isSignIn } = props;

    return (
        <div className={`popup popup_type_confirm ${isOpen}`}>
            <div className="popup__container popup__container_for_confirm">
                {<>
                    <img
                        className="popup__tooltip"
                        alt={isSignIn ? 'Удачно' : 'Неудачно'}
                        src={isSignIn ? confirmYes : confirmNo}
                    />
                    <button
                        onClick={onClose}
                        className="popup__button-close popup__close"
                        type="button"
                    ></button>
                    <h2 className="popup__title">
                        {isSignIn
                            ? 'Вы успешно зарегистрировались!'
                            : 'Что-то пошло не так!Попробуйте ещё раз.'}
                    </h2>
                </>
                }


            </div>
        </ div >
    )
}
export default InfoTooltip;

