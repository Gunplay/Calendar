import React from 'react'
import styled from 'styled-components'

const DivWrapper = styled('div')`
  display: flex;
  align-item: center;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
`
const TextWrapper = styled('span')`
  font-size: 32px;
`
// extent from parent - TextWrapper
const TittleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
`
console.log(TittleWrapper)

const Monitor = () => (
  <DivWrapper>
    <div>
      <TittleWrapper>December</TittleWrapper>
      <TextWrapper>2023</TextWrapper>
    </div>
    <div>
      <button> &lt; </button>
      <button>Today</button>
      <button> &gt; </button>
    </div>
  </DivWrapper>
)

export { Monitor }
