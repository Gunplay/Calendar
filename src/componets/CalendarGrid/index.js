import moment from 'moment'
import React from 'react'
// npm i -S styled-componetns - делаем из тега div - styled componets
import styled from 'styled-components'

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color: #404040;
`

const CellWrapper = styled.div`
  min-width: 140px;
  min-height: 80px;
  background-color: ${(props) => (props.isWeekend ? '#272829' : '#1e1f21')};
  color: #dddcdd;
`

const RowInCell = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
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

const CalendarGrid = ({ startDayOfWeek }) => {
  const totalDays = 42
  const day = startDayOfWeek.clone().subtract(1, 'day')
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone()) // 6 week maks in the mounth (min = 4) 6 * 7 = 42 cels
  console.log(daysArray)

  const isCurrentDay = (day) => moment().isSame(day, 'day')
  return (
    <GridWrapper>
      {daysArray.map((dayItem) => (
        <CellWrapper
          key={dayItem.format('DDMMYYYY')}
          isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
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
  )
}
export default CalendarGrid
