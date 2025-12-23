'use client'
import { createContext, useEffect, useReducer } from "react";

export const ThemeContext = createContext();

export const themes = {
    light: "Light",
    dark: "Dark"
};

const reducer = (state, action) => {
    switch (action.type) {
        case "setTheme":
            localStorage.setItem("theme", JSON.stringify(action.payload));
            return { ...state, theme: action.payload };
        case "changeTheme": {
            const newTheme = state.theme === themes.light ? themes.dark : themes.light;
            localStorage.setItem("theme", JSON.stringify(newTheme));
            return { ...state, theme: newTheme };
        }
        default:
            return state;
    }
};

export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { theme: themes.light });

    useEffect(() => {
        const localStorageTheme = localStorage.getItem("theme");
        const initialTheme = localStorageTheme === null ? themes.light : JSON.parse(localStorageTheme);
        dispatch({ type: "setTheme", payload: initialTheme });
    }, []);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
}