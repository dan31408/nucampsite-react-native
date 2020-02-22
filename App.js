import React from "react";
import Main from "./components/MainComponent";
import Loading from "./components/LoadingComponent";
import { persistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

console.disableYellowBox = true;

const store = ConfigureStore();

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
