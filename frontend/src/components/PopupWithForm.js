export default function PopupWithForm(props) {
    const modalClasses = `modal modal_${props.name}`

    return (
        <div className={props.isOpen ? modalClasses + " modal_active" : modalClasses}>
          <div className="modal__overlay" onClick={props.onClose}></div>
          <div className={`modal__content modal__content-${props.name}`}>
            <button type="button" className="modal__button-close" onClick={props.onClose}></button>
            <form className="modal__form" name={props.name} onSubmit={props.onSubmit}>
                <h2 className="modal__title">{props.title}</h2>
                {props.children}
                <button type="submit" className="modal__button-save">{props.buttonText}</button>
            </form>
          </div>
        </div>
    );
}