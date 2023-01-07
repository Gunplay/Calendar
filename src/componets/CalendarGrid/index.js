import moment from 'moment'
import React from 'react'
// npm i -S styled-componetns - делаем из тега div - styled componets
import styled from 'styled-components'

//grid-template-rows: repeat(6, 1fr);
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? '#1e1f21' : '#404040')};
  ${(props) => props.isHeader && 'border-bottom: 1px solid #404040'}
`

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${(props) => (props.isHeader ? 24 : 80)}px;
  display: ${(props) => (props.isHeader ? 'flex' : '')};
  justify-content: ${(props) => (props.isHeader ? 'right' : '')};
  background-color: ${(props) => (props.isWeekend ? '#272829' : '#1e1f21')};
  color: ${(props) => (props.isSelectedMonth ? '#dddcdd' : '#555759')};
`

const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  ${(props) => props.pr && `padding-right: ${props.pr * 8}px`}
`
const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  align-items: center;
  justify-content: center;
  margin: 5px;
  cursor: pointer;
`
const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ShowDayWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`
// Text
const EventListWrapper = styled('div')`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`
const EventItemWrapper = styled('button')`
  position: relative;
  left: -14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  background: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
`

const CalendarGrid = ({
  startDayOfWeek,
  today,
  totalDays,
  events,
  openFormHandler,
}) => {
  // const totalDays = 42
  const day = startDayOfWeek.clone().subtract(1, 'day')
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone()) // 6 week maks in the mounth (min = 4) 6 * 7 = 42 cels
  // console.log(daysArray)

  const isCurrentDay = (day) => moment().isSame(day, 'day') // current day
  const isSelectedMonth = (day) => today.isSame(day, 'month') // Прредали от радителя и сделали что текущий месяц был белым цветом
  return (
    <>
      <GridWrapper isHeader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper isHeader isSelectedMonth key={i}>
            {/* padding-right 1 indent = 8px */}
            <RowInCell justifyContent={'flex-end'} pr={1}>
              {moment()
                .day(i + 1)
                .format('ddd')}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
      <GridWrapper>
        {daysArray.map((dayItem) => (
          <CellWrapper
            key={dayItem.unix()} // число секунд с 1970 гожа
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            isSelectedMonth={isSelectedMonth(dayItem)}
          >
            <RowInCell justifyContent={'flex-end'}>
              <ShowDayWrapper
                onDoubleClick={(e) => openFormHandler('Create')}
                onDoubleClickCapture
              >
                <DayWrapper>
                  {isCurrentDay(dayItem) ? (
                    <CurrentDay>{dayItem.format('D')}</CurrentDay>
                  ) : (
                    dayItem.format('D')
                  )}
                </DayWrapper>
              </ShowDayWrapper>
              <EventListWrapper>
                {/* <div>S: {dayItem.format('X')}</div> */}
                {events
                  .filter(
                    (event) =>
                      event.date >= dayItem.format('X') &&
                      event.date <= dayItem.clone().endOf('day').format('X')
                  )
                  .map((event) => (
                    <li key={event.date}>
                      <EventItemWrapper
                        onDoubleClick={(e) => openFormHandler('Update', event)}
                      >
                        {event.title}
                      </EventItemWrapper>
                    </li>
                  ))}
                {/* <div>E: {dayItem.clone().endOf('day').format('X')}</div> */}
              </EventListWrapper>
              {/* method check days - {dayItem.day()} */}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </>
  )
}
export default CalendarGrid
