import { applyMiddleware, createStore, Middleware } from "redux";
import { rootReducer } from "./reducer";
import logger from "redux-logger";

let middleware: Middleware[] = [];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export default () => createStore(rootReducer, applyMiddleware(logger))