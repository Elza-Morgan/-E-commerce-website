import { useRef, useEffect, useState } from "react";

export default function Modal({ children, show, ...rest }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (show) {
        document.body.classList.remove("modal-hidden");
    } else {
      document.body.classList.add("modal-hidden");
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [show]);

  const handleClose = () => setShowModal(false);

  const ref = useRef();

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose();
    }
  };

  return (
    <div className={`modal-background ${show ? 'show' : ''}`} onClick={handleClose}>
      <div ref={ref} className={`modal-children ${show ? 'show' : ''}`} onClick={(e) => e.stopPropagation()} {...rest}>
        {children}
      </div>
    </div>
  );
}
