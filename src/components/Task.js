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
      draggableId={task.id} //act like a key
      index={index} //task order
    >
      {(provided, snapshot) =>
        <Container
          {...provided.draggableProps} //assign the component to be draggable
          {...provided.dragHandleProps} //the handle of element capable to move the draggable 
          ref={provided.innerRef} //supply DOM node
          isDragging={snapshot.isDragging} //state when task is dragging by
        >
          <Title>{task.content}</Title>
        </Container>
      }
    </Draggable>
  )
}

export default Task
