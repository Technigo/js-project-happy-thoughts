import styled from 'styled-components'

export const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-background);
`

export const Loader = () => {
  return (
    <StyledLoader>
      <svg
        width='100'
        height='100'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='50'
          cy='50'
          r='40'
          stroke='#333'
          strokeWidth='4'
          fill='none'
        />
        <path
          d='M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z'
          fill='#ffadad'
        />
      </svg>
    </StyledLoader>
  )
}
