import React from 'react'
import moment from 'moment/moment'
import { Header } from '../Header'
import { Monitor } from '../Monitor'
import CalendarGrid from '../CalendarGrid'

function App() {
  window.moment = moment

  moment.updateLocale('eng', { week: { dow: 1 } })

  const startDayOfWeek = moment().startOf('month').startOf('week')
  // const endDayOfWeek = moment().endOf('month').endOf('week')
  // // console.log(startDayOfWeek.format('YYYY-MM-DD')) // Monday 28
  // // console.log(endDayOfWeek.format('YYYY-MM-DD')) // Sunday 31

  // const calendar = []
  // const day = startDayOfWeek.clone()

  // window.day = day
  // window.startDayOfWeek = startDayOfWeek
  // window.endDayOfWeek = endDayOfWeek

  // while (!day.isAfter(endDayOfWeek)) {
  //   calendar.push(day.clone()) // clone () что бы не перезаписывать один и тот же день
  //   day.add(1, 'day')
  // }

  return (
    <div>
      <Header />
      <Monitor />
      <CalendarGrid startDayOfWeek={startDayOfWeek} />
    </div>
  )
}

export default App
