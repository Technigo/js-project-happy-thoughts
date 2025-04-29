import styled from 'styled-components'

export const StyledTextBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

export const TextBox = () => {
  return (
    <form className='textBox'>
      <input type='text' placeholder='Type your thoughts here...' />
    </form>
  )
}
