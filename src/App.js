import { useState } from 'react'

import List from './components/List'
import Removed from './components/Removed'
import TaskInput from './components/TaskInput'

import './App.css'
import './themes/nord.css'

function App() {
  const [data, setData] = useState({
    tasks: [
      {
        text: "Buy Milk",
        active: true,
      },
      {
        text: "Wash Clothes",
        active: false,
      },
      {
        text: "Drink Water",
        active: true,
      },
    ],
    removed: [
      "Feed Kittens",
      "Piano lessons",
    ],
  })

  const actions = {
    // string
    addTask: function (text) {
      let newData = {
        tasks: [...data.tasks],
        removed: [...data.removed],
      }
      newData.tasks.push({
        text,
        active: true,
      })
      setData(newData)
    },
    // integer
    toggleTaskStatus: function (index) {
      let newData = {
        tasks: [...data.tasks],
        removed: [...data.removed],
      }
      newData.tasks[index].active = !(newData.tasks[index].active)
      setData(newData)
    },
    removeAllCompletedTasks: function () {
      let newData = {
        tasks: [],
        removed: [...data.removed],
      }
      data.tasks.forEach(task => {
        if (task.active)
          newData.tasks.push(task)
        else
          newData.removed.push(task.text)
      })
      setData(newData)
    }
  }

  return (
    <div className="App">
      <div className="left">
        <TaskInput addTask={actions.addTask} />
        <List tasks={data.tasks} toggleTaskStatus={actions.toggleTaskStatus} />
      </div>
      <div className="right">
        <button onClick={actions.removeAllCompletedTasks}>Remove Completed Tasks</button>
        <Removed removed={data.removed} />
      </div>
    </div>
  );
}

export default App;
