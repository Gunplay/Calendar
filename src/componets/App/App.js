import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import styled from 'styled-components'
import { Header } from '../Header'
import { Monitor } from '../Monitor'
import CalendarGrid from '../CalendarGrid'
import Title from '../Title'
import '../../index.css'

const ShadowWrapper = styled.div`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-botton: 1px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`
const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FormWrapper = styled(ShadowWrapper)`
  width: 200px;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
`
const EventTitle = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset:
  background-color: #1e1f21;
  color: #black;
  outline: unset;
  border-bottom: 1px solid #464648;
`

const EventBody = styled('input')`
padding: 4px 14px;
font-size: .85rem;
width: 100%;
border: unset:
background-color: #1e1f21;
color: #black;
outline: unset;
border-bottom: 1px solid #464648;
`

const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`

const url = 'http://localhost:5000'
const totalDays = 42

// CLick on date
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X'),
}

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

  const [method, setMethod] = useState(null)
  const [isShowForm, setShowForm] = useState(false)
  const [event, setEvent] = useState(null) // for create and update event

  const [events, setEvents] = useState([])
  const startDayQuery = startDayOfWeek.clone().format('X')
  console.log(startDayOfWeek)
  const endDayQuery = startDayOfWeek.clone().add(totalDays, 'days').format('X')

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('Response', res)
        setEvents(res)
      })
  }, [today])

  const openFormHandler = (methodName, eventForUpdate) => {
    console.log('openFormHandler', methodName)
    setShowForm(true)
    setEvent(eventForUpdate || defaultEvent)
    setMethod(methodName)
  }

  const cancelButtonHandler = () => {
    setShowForm(false)
    setEvent(null)
  }

  const changeEventHandler = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }))
  }

  const eventFetchHandler = () => {
    const fetchUrl =
      method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`
    const httpMethod = method === 'Update' ? 'PATCH' : 'POST'

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (method === 'Update') {
          setEvents((prevState) =>
            prevState.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
          )
        } else {
          setEvents((prevState) => [...prevState, res])
        }
        cancelButtonHandler()
      })
  }

  return (
    <>
      {isShowForm ? (
        <FormPositionWrapper onClick={cancelButtonHandler}>
          {/* stopPropagation() убирает всплытие событий  !!!!*/}
          <FormWrapper onClick={(e) => e.stopPropagation()}>
            <EventTitle
              value={event.title}
              onChange={(e) => changeEventHandler(e.target.value, 'title')}
            />
            <EventBody
              value={event.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, 'description')
              }
            />
            <ButtonsWrapper>
              <button onClick={cancelButtonHandler}>Cancel</button>
              <button onClick={eventFetchHandler}>{method}</button>
            </ButtonsWrapper>
          </FormWrapper>
        </FormPositionWrapper>
      ) : null}
      {/* isShowForm && <div>FORM</div> */}
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
    </>
  )
}

export default App
