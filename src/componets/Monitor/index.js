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
// extend from parent - TextWrapper - component
const TittleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
`
console.log(TittleWrapper)

const ButtonWrapper = styled('button')`
  background-color: #565759;
  height: 28px;
  margin-right: 2px;
  border-radius: 4px;
  border: 2px solid red;
  border: unset;
  outline: unset;
  color: #e6e6e6;
  cursor: pointer;
`
const TodayButton = styled(ButtonWrapper)`
  padding-right: 16px;
  padding-left: 16px;
  font-weight: bold;
`
const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`
const Monitor = ({ today, prevHandler, todayHandler, nextHandler }) => (
  <DivWrapper>
    <div>
      <TittleWrapper>{today.format('MMMM')}</TittleWrapper>
      <TextWrapper>{today.format('YYYY')}</TextWrapper>
    </div>
    <ButtonsWrapper>
      <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
      <TodayButton onClick={todayHandler}>Today</TodayButton>
      <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
    </ButtonsWrapper>
  </DivWrapper>
)

export { Monitor }
