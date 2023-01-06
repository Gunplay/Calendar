import React, { useEffect, useState } from 'react'
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

const url = 'http://localhost:5000'
const totalDays = 42

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

  const [events, setEvents] = useState([])
  const startDayQuery = startDayOfWeek.clone().format('X')
  const endDayQuery = startDayOfWeek.clone().add(totalDays, 'days').format('X')

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('Response', res)
        setEvents(res)
      })
  }, [today])

  const openFormHandler = (method) => {
    console.log('openFormHandler', method)
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
      <CalendarGrid
        startDayOfWeek={startDayOfWeek}
        today={today}
        totalDays={totalDays}
        events={events}
        openFormHandler={openFormHandler}
      />
    </ShadowWrapper>
  )
}

export default App
