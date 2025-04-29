import React from 'react'
import { useState } from 'react'

// Two variants of a button
// 1. A button that takes a text and an onClick function as props

// 2. A button that takes an icon and an onClick function as props

export const Button = ({ text, onClick }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
    onClick()
  }

  return (
    <button className='button' onClick={handleClick}>
      {text}
    </button>
  )
}
