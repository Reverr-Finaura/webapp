import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import Test from "./TestPage/Test";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'


TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    
      
    </Provider>
  </BrowserRouter>
);
