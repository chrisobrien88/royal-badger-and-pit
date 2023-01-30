import React from 'react'
import { useTheme, useThemeUpdate } from '../contexts/ThemeContext'

const Navbar = () => {
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#ffffff',
        color: darkTheme ? '#CCC' : '#333'
    }

  return (
    <nav className='navbar navbar-inverse navbar-fixed-bottom'>
        <p>Navbar</p>
        <button style={themeStyles} onClick={toggleTheme}>{darkTheme? "light" : "dark" }</button>
    </nav>
  )
}

export default Navbar