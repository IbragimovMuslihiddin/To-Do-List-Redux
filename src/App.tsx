import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReduxTodoList } from "./components/ReduxTodoList";

const App: React.FC = () => (
  <Provider store={store}>
    <ReduxTodoList />
  </Provider>
);

export default App;
