import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { wrapperPersistStore } from "../src/redux/store";
import App from "./App";
import { ToastProvider } from "./components/toast/ToastProvider";
import { CartProvider } from "./Context/CartContext";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={wrapperPersistStore}
        >
            <CartProvider>
                <BrowserRouter>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </BrowserRouter>
            </CartProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
