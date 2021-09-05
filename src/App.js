import React, { useState } from 'react'
import styled from 'styled-components'
import Column from './components/Column'
import './App.css';

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

  return (
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
  );
}

export default App;
