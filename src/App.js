import React, { useState } from 'react'
import styled from 'styled-components'
import Column from './components/Column'
import { DragDropContext } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage', dragDisabled: false },
    'task-2': { id: 'task-2', content: 'Watch my favorite show', dragDisabled: true },
    'task-3': { id: 'task-3', content: 'Charge my phone', dragDisabled: false },
    'task-4': { id: 'task-4', content: 'Cook dinner', dragDisabled: false },
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

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const sourceColumn = list.columns[source.droppableId]
    const destinationColumn = list.columns[destination.droppableId]

    if (sourceColumn === destinationColumn && type === 'task') {
      const newTaskIds = Array.from(sourceColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds
      }

      setList({
        ...list,
        columns: {
          ...list.columns,
          [newColumn.id]: newColumn
        }
      })
      return
    }

    // moving into other column
    const sourceTaskIds = Array.from(sourceColumn.taskIds) //assign new array for the list
    sourceTaskIds.splice(source.index, 1) //remove item from this index
    const newSource = {
      ...sourceColumn,
      taskIds: sourceTaskIds
    }

    const destinationTaskIds = Array.from(destinationColumn.taskIds) //assign new array for the list
    destinationTaskIds.splice(destination.index, 0, draggableId) //insert this index a moved item
    const newDestination = {
      ...destinationColumn,
      taskIds: destinationTaskIds
    }

    setList({
      ...list,
      columns: {
        ...list.columns,
        [newSource.id]: newSource,
        [newDestination.id]: newDestination
      }
    })
    return

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
