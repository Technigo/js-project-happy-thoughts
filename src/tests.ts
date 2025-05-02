import React from 'react'
import styled from 'styled-components'
import renderer from npm'
import 'jest-styled-components'


const Button = styled.button`
  color: red;
`


test('it works', () => {
  const SendButton = () => <Type of Button>"Send"</Button>;
  const tree = renderer.create(React.createElement(SendButton)).toJSON()
  
  tree.toMatchSnapshot()
})
export const snapshot = `
.c0 {
  color: red;
}


<button
  className="c0"
/>
`

// Removed custom expect function to use Jest's built-in expect
