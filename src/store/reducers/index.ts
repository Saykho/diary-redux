import { combineReducers } from "redux";
import { diaryReducer } from "./diaryReducer";

export const rootReducer = combineReducers(
    {
        diary: diaryReducer
    }
);

export type RootState = ReturnType<typeof rootReducer>;