import React, { useContext } from 'react';

const ThemeContext = React.createContext<boolean>(true);
const ThemeUpdateContext = React.createContext<any>(null);

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const useThemeUpdate = () => {
    console.log('useThemeUpdate');
    
    return useContext(ThemeUpdateContext);
}


export const ThemeProvider = ({ children }: any) => {
    const [darkTheme, setDarkTheme] = React.useState<boolean>(true);
    
    function toggleTheme () {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }
    
    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
    };