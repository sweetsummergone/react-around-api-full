function ImagePopup({ card, onClose }) {
  const isOpen = Object.keys(card).length > 0;

  return (
    <div
      className={
        !isOpen
          ? "modal modal_popup"
          : "modal modal_popup modal_active"
      }
    >
      <div className="modal__overlay" onClick={onClose} />
      <div className="popup">
        <button
          type="button"
          className="modal__button-close popup__close"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <h2 className="popup__title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
