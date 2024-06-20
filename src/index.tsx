import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { wrapperPersistStore } from "../src/redux/store";
import App from "./App";
import { ToastProvider } from "./components/toast/ToastProvider";
import { CartProvider } from "./Context/CartContext";
import { DataProvider } from "./Context/InfoProductContext";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={wrapperPersistStore}
        >
            <CartProvider>
                <DataProvider>
                    <BrowserRouter>
                        <ToastProvider>
                            <App />
                        </ToastProvider>
                    </BrowserRouter>
                </DataProvider>
            </CartProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
