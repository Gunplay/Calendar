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
  background-color: ${(props) => (props.isWeekend ? '#272829' : '#1e1f21')};
  color: ${(props) => (props.isSelectedMonth ? '#dddcdd' : '#555759')};
`

const RowInCell = styled.div`
  display: flex;
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

const CalendarGrid = ({ startDayOfWeek, today, totalDays }) => {
  // const totalDays = 42
  const day = startDayOfWeek.clone().subtract(1, 'day')
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone()) // 6 week maks in the mounth (min = 4) 6 * 7 = 42 cels
  // console.log(daysArray)

  const isCurrentDay = (day) => moment().isSame(day, 'day') // current day
  const isSelectedMonth = (day) => today.isSame(day, 'month') // Прредали от радителя и сделали что текущий месяц был белым цветом
  return (
    <>
      <GridWrapper isHeader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper isHeader isSelectedMonth>
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
              <DayWrapper>
                {isCurrentDay(dayItem) ? (
                  <CurrentDay>{dayItem.format('D')}</CurrentDay>
                ) : (
                  dayItem.format('D')
                )}
              </DayWrapper>
              {/* method check days - {dayItem.day()} */}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </>
  )
}
export default CalendarGrid
