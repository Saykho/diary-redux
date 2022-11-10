import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { DiaryActionType } from "../types/diary";
import "./Diary.scss";
import { formatDate } from "../helpers/date-helpers";

export function Diary() {
    const dispatch = useDispatch();
    const notes = useTypedSelector(state => {
        const currentPage = state.diary.currentPage;
        const volumePage = state.diary.volumePage;
        const notes = [...state.diary.notes];
        return notes.splice((currentPage - 1) * volumePage, volumePage); // вычисление текущей страницы ... пропуск n-ых записей, чтобы перейти на следующую страницу
    });
    const allNotesCount = useTypedSelector(state => state.diary.notes.length);
    const volumePage = useTypedSelector(l => l.diary.volumePage);
    const [inputText, setInputText] = useState<string>("");
    const pagesCount = Math.ceil(allNotesCount / volumePage); // вычисление количества страниц

    const pages = Array.apply(null, Array(pagesCount)).map((_, index) => index + 1); //заполнение пустого массива с количеством элементов pageCount index+1 значениями

    const handleChange = (e: FormEvent<HTMLInputElement>, noteId: number) => { //функция для изменения текста внутри input по id заметки
        const target = e.target as HTMLInputElement; //типизирование e.target
        dispatch({
            type: DiaryActionType.CHANGE_NOTE_TEXT,
            payload: {
                id: noteId,
                text: target.value
            }
        });
    };

    return (
        <div className="diary">
            <input className="diary__input"
                   type="text"
                   onInput={(e: FormEvent<HTMLInputElement>) => {
                       const target = e.target as HTMLInputElement;
                       setInputText(target.value);
                   }}/>
            <button className="diary__add-note"
                    onClick={() => dispatch({
                        type: DiaryActionType.ADD_NOTE,
                        payload: {
                            text: inputText,
                        }
                    })}>
                Добавить заметку
            </button>
            <div className="diary__pages">
                {pages.map(p =>
                    (
                        <span key={p}
                              onClick={() => {
                                  dispatch({
                                      type: DiaryActionType.SET_PAGE,
                                      payload: {
                                          currentPage: p,
                                      }
                                  });
                              }}>
                            {p} &nbsp;
                        </span>
                    ))}
            </div>
            {notes.map(n =>
                (
                    <div className="diary__note"
                         key={n.id}>
                        {<input className="note-input"
                                type="text"
                                value={n.text}
                                onChange={(e) => handleChange(e, n.id)}/> /*функция принимает 2 параметра: event и id записи*/}
                        <div className="change-date">{formatDate(n.lastChange)}</div>
                        <button className="button-delete"
                                onClick={() => {
                                    dispatch({
                                        type: DiaryActionType.DELETE_NOTE,
                                        payload: {
                                            id: n.id,
                                        }
                                    });
                                }}>x
                        </button>
                    </div>
                ))
            }
        </div>
    );
}