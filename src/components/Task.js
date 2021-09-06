import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: ${({ isDragging }) => isDragging ? '#175586' : '#2a93d6'};
`

const Title = styled.div`
  font-size: 1rem;
  color: #ffffff;
`

const Task = ({ task, index }) => {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
    >
      {(provided, snapshot) =>
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Title>{task.content}</Title>
        </Container>
      }
    </Draggable>
  )
}

export default Task
