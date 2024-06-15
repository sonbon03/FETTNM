import React, { useState } from "react";

function ToastComponent() {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <>
            <button
                type="button"
                className="btn-blue"
                onClick={toggleShow}
            >
                Show live toast
            </button>
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div
                    className="toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ display: show ? "block" : "none" }}
                >
                    <div className="toast-header">
                        <img
                            src="images/default.png"
                            alt=""
                        />
                        <strong className="me-auto">Đăng nhập thành công!</strong>
                        <small>11 mins ago</small>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={toggleShow}
                        ></button>
                    </div>
                    <div className="toast-body">Hello, world! This is a toast message.</div>
                </div>
            </div>
        </>
    );
}

export default ToastComponent;
