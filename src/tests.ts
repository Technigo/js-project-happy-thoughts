import React from 'react'
import styled from 'styled-components'
import 'jest-styled-components'
import renderer from 'react-test-renderer'


const Button = styled.button`
  color: red;
`


test('it works', () => {
  const SendButton: React.FC<typeof Button> = () => <Button>Send</Button>;
  const tree = renderer.create(React.createElement(SendButton)).toJSON();
  
  expect(tree).toMatchSnapshot();
});
export const snapshot = `
.c0 {
  color: red;
}


<button
  className="c0"
/>
`

// Removed custom expect function to use Jest's built-in expect
