import React from "react";
import Main from "./components/MainComponent";
import Loading from "./components/LoadingComponent";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

console.disableYellowBox = true;

const {persistor, store } = ConfigureStore();

export default function App() {
  return (
    //this updates react native to use redux
    <Provider store={store}>
      <PersistGate 
      loading={<Loading />} 
      persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
