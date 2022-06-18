import success from "../images/success.svg";
import fail from "../images/fail.svg";

function RegisterPopup({ success : isSuccess, isModalActive, onClose }) {
  return (
    <div className={isModalActive ? "modal modal_active" : "modal"}>
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content">
        <button
          type="button"
          className="modal__button-close"
          onClick={onClose}
        />
        <img
          className="modal__image_result"
          src={isSuccess ? success : fail}
          alt={isSuccess ? "sucess" : "fail"}
        />
        <h2 className="modal__title_result">
          {isSuccess
            ? "Success! You have now been registered."
            : "Oops, something went wrong! Please try again."}
        </h2>
      </div>
    </div>
  );
}

export default RegisterPopup;
