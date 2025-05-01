import styled from 'styled-components'

export const StyledErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  width: 300px;
  height: auto;
  background-color: #ffadad;
  border: 2px solid black;
  box-shadow: 6px 6px 0 0 black;
  margin: 2rem auto;
  font-size: 14px;
`

export const ErrorMessage = () => {
  return (
    <div className='error-message'>
      <p>Something went wrong. Please try again later.</p>
    </div>
  )
}
