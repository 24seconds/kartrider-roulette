import { createStore } from "redux";
import rootReducer from "./reducer";

export const IMAGE_URL = 'asset'
export default createStore(rootReducer);
