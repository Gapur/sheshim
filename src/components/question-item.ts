import styled from 'styled-components'

import { colors } from 'theme'

interface StatsProps {
  direction?: 'column' | 'row'
}

const Stats = styled.div<StatsProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction === 'column' ? 'column' : 'row')};
  margin-right: 12px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Body = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`

const Started = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: ${colors.eclipse};
`

export const QuestionItem = {
  Stats,
  Content,
  Body,
  Started,
}
