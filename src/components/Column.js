import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Task from './Task'

const Wrapper = styled.div`
  flex: 1;
`

const Container = styled.div`
  padding: 1rem;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  background-color: ${props => props.isDraggingOver ? '#eeeeee' : '#ffffff'};
  flex: 1 1;
  margin: 0 8px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 1.5rem;
  color: #115488;
`

const TaskList = styled.div`
  flex: 1 0;
  min-height: 100px;
`

const Column = ({ column, tasks }) => {
  return (
    <Wrapper>
      <Droppable droppableId={column.id} type="task">
        {(provided, snapshot) =>
          <Container
            isDraggingOver={snapshot.isDraggingOver}
          >
            <Title>{column.title}</Title>
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </TaskList>
          </Container>
        }
      </Droppable>
    </Wrapper>
  )
}

export default Column
