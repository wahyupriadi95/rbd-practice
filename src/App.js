import React, { useState } from 'react'
import styled from 'styled-components'
import Column from './components/Column'
import { DragDropContext } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Make Components' },
    'task-2': { id: 'task-2', content: 'Create Homepage' },
    'task-3': { id: 'task-3', content: 'Build Login Page' },
    'task-4': { id: 'task-4', content: 'Optimization' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
  sourceColumnIndex: null
}

const Container = styled.div`
  font-family: 'Montserrat', 'sans-serif';
  display: flex;
  padding: 0.5rem;
  max-width: 1024px;
`
const App = () => {
  const [list, setList] = useState(initialData)

  const handleDragEnd = (end) => {

    const { destination, source, draggableId, type } = end

    if (!destination) return // destination not found
    if (destination.droppableId === source.droppableId && destination.index === source.index) return //destination has same index

    const sourceColumn = list.columns[source.droppableId] //get data of source columns
    const destinationColumn = list.columns[destination.droppableId] //get data of destination columns

    if (sourceColumn === destinationColumn && type === 'task') { // moving within same column
      const newTaskIds = Array.from(sourceColumn.taskIds) //assign new array for the list
      newTaskIds.splice(source.index, 1) //remove item from this index
      newTaskIds.splice(destination.index, 0, draggableId) //insert this index a moved item

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds
      } //update column 

      setList({
        ...list,
        columns: {
          ...list.columns,
          [newColumn.id]: newColumn
        }
      })
      return
    }

  }

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
    >
      <Container>
        {list.columnOrder.map((columnId, index) => {
          const column = list.columns[columnId]
          const tasks = column.taskIds.map(taskId => list.tasks[taskId])
          return (
            <Column
              key={column.id}
              index={index}
              column={column}
              tasks={tasks}
            />
          )
        })
        }
      </Container>
    </DragDropContext>
  );
}

export default App;
