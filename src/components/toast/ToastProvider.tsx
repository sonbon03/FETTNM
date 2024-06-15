import React, { createContext, useContext, useMemo, useState } from "react";

interface IToastContext {
    showToast: (param?: { title: string | null; message: string | null; time?: string | null }) => void;
}

interface IToastProps {
    children?: React.ReactElement;
}

const ToastContext = createContext<IToastContext>({
    showToast(param) {},
});

export const ToastProvider: React.FunctionComponent<IToastProps> = (props) => {
    const [data_toast, setDataToast] = useState<{
        title: string | null;
        message: string | null;
        time: string | null;
    }>({
        title: null,
        message: null,
        time: null,
    });
    const [show, setShow] = useState<boolean>(false);

    const value_context = useMemo(() => {
        return {
            showToast: (params: any) => {
                setShow(true);
                setDataToast(params);
                setTimeout(() => {
                    setShow(false);
                }, 3000);
            },
        };
    }, [setDataToast]);

    const toggleShow = () => setShow(!show);

    return (
        <ToastContext.Provider value={value_context}>
            {props.children}
            {show && (
                <>
                    <div className="toast-container position-fixed bottom-0 end-0 p-3">
                        <div
                            className="toast"
                            role="alert"
                            aria-live="assertive"
                            aria-atomic="true"
                            style={{ display: show ? "block" : "none" }}
                        >
                            <div className="toast-header">
                                {/* <img src={default_img} alt="" /> */}
                                <strong className="me-auto">{data_toast.title}</strong>
                                {data_toast.time && <small>{data_toast.time}</small>}
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={toggleShow}
                                ></button>
                            </div>
                            <div className="toast-body">{data_toast.message}</div>
                        </div>
                    </div>
                </>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const toast = useContext(ToastContext);
    return toast;
};
