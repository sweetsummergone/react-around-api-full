function ImagePopup(props) {
    return (
        <div className={Object.keys(props.card).length === 0 ? "modal modal_popup" : "modal modal_popup modal_active"}>
          <div className="modal__overlay" onClick={props.onClose}></div>
          <div className="popup">
            <button type="button" className="modal__button-close popup__close" onClick={props.onClose}></button>
            <img className="popup__image" src={props.card.link} alt={props.card.name} />
            <h2 className="popup__title">{props.card.name}</h2>
          </div>
        </div>
    );
}

export default ImagePopup;