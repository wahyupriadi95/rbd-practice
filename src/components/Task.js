import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: #2a93d6;
`

const Title = styled.div`
  font-size: 1rem;
  color: #ffffff;
`

const Task = ({ task }) => {
  return (
    <Container>
      <Title>{task.content}</Title>
    </Container>

  )
}

export default Task
