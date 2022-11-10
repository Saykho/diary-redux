export interface Note {
    id: number;
    text: string;
    lastChange: Date;
    isCompleted: boolean;
}

export interface DiaryStore {
    notes: Note[];
    idCounter: number;
    currentPage: number;
    volumePage: number;
}

export enum DiaryActionType {
    ADD_NOTE = "ADD_NOTE",
    DELETE_NOTE = "DELETE_NOTE",
    CHANGE_NOTE_TEXT = "CHANGE_NOTE_TEXT",
    SET_PAGE = "SET_PAGE",
}

interface AddNoteAction {
    type: DiaryActionType.ADD_NOTE;
    payload: {
        text: string
    };
}

interface DeleteNoteAction {
    type: DiaryActionType.DELETE_NOTE;
    payload: {
        id: number;
    }
}

interface ChangeNoteTextAction {
    type: DiaryActionType.CHANGE_NOTE_TEXT;
    payload: {
        id: number;
        text: string;
    }
}

interface SetPageAction {
    type: DiaryActionType.SET_PAGE;
    payload: {
        currentPage: number;
    }
}

export type DiaryAction = AddNoteAction | DeleteNoteAction | ChangeNoteTextAction | SetPageAction;