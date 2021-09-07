import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
  margin-top: 0.5rem;
  background-color: ${({ isDragging, isTaskDisabled }) => isTaskDisabled ? '#9e9e9e' :  isDragging ? '#175586' : '#2a93d6'}; /* change color when disabled */
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
      isDragDisabled={task.dragDisabled} //disable or enable dragging
    >
      {(provided, snapshot) =>
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isTaskDisabled={task.dragDisabled} //change style when draggable disabled
        >
          <Title>{task.content}</Title>
        </Container>
      }
    </Draggable>
  )
}

export default Task
