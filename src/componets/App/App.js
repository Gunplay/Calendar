import React from 'react'
import moment from 'moment/moment'
import styled from 'styled-components'
import { Header } from '../Header'
import { Monitor } from '../Monitor'
import CalendarGrid from '../CalendarGrid'

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
  const today = moment()
  const startDayOfWeek = today.clone().startOf('month').startOf('week')

  window.moment = moment

  return (
    <ShadowWrapper>
      <Header />
      <Monitor today={today} />
      <CalendarGrid startDayOfWeek={startDayOfWeek} />
    </ShadowWrapper>
  )
}

export default App
