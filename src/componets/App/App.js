import React, { useState } from 'react'
import moment from 'moment/moment'
import styled from 'styled-components'
import { Header } from '../Header'
import { Monitor } from '../Monitor'
import CalendarGrid from '../CalendarGrid'
import Title from '../Title'

const ShadowWrapper = styled.div`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-botton: 1px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`
function App() {
  moment.updateLocale('eng', { week: { dow: 1 } })
  // const today = moment()
  const [today, setToday] = useState(moment())
  const startDayOfWeek = today.clone().startOf('month').startOf('week')

  window.moment = moment

  const prevHandler = () => {
    // если не делать clone(), то мы будем делать мутацию, и это ошибка
    setToday((prev) => prev.clone().subtract(1, 'month'))
  }
  const todayHandler = () => setToday(moment())
  const nextHandler = () => {
    setToday((next) => next.clone().add(1, 'month'))
  }

  return (
    <ShadowWrapper>
      <Title />
      <Header />
      <Monitor
        today={today}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <CalendarGrid startDayOfWeek={startDayOfWeek} />
    </ShadowWrapper>
  )
}

export default App
