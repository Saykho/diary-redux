import { DiaryAction, DiaryActionType, DiaryStore } from "../../types/diary";

const initialState: DiaryStore = {
    notes: [],
    idCounter: 1,
    volumePage: 5,
    currentPage: 1
};

export const diaryReducer = (state = initialState, action: DiaryAction): DiaryStore => {
    switch (action.type) {
        case DiaryActionType.ADD_NOTE:
            return {
                ...state, notes: [...state.notes, {
                    text: action.payload.text,
                    lastChange: new Date(),
                    isCompleted: false,
                    id: state.idCounter,
                }],
                idCounter: state.idCounter + 1,
            };
        case DiaryActionType.DELETE_NOTE:
            return {...state, notes: state.notes.filter(n => n.id !== action.payload.id)};

        case DiaryActionType.CHANGE_NOTE_TEXT: {
            const foundNote = state.notes.find(n => n.id === action.payload.id);
            if (foundNote) {
                foundNote.text = action.payload.text;
                foundNote.lastChange = new Date();
            }
            return {
                ...state, notes: [...state.notes]
            };
        }
        case DiaryActionType.SET_PAGE:
            return {...state, currentPage: action.payload.currentPage};
        default:
            return state;
    }
};