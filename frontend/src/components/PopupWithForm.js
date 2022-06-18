export default function PopupWithForm({
  children,
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  const modalClasses = `modal modal_${name}`;

  return (
    <div className={isOpen ? modalClasses + " modal_active" : modalClasses}>
      <div className="modal__overlay" onClick={onClose} />
      <div className={`modal__content modal__content-${name}`}>
        <button
          type="button"
          className="modal__button-close"
          onClick={onClose}
        />
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          {children}
          <button type="submit" className="modal__button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
