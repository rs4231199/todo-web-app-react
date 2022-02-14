import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import List from './components/List'
import Removed from './components/Removed'
import TaskInput from './components/TaskInput'

import { auth, db } from './firebase/authentication'
import { loremTasks } from './sampleData'

import './App.css'
import './themes/nord.css'

let uid
let lastId = loremTasks.tasks.at(-1).id

function App() {
  const [data, setData] = useState(JSON.parse(JSON.stringify(loremTasks)))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        uid = user.uid
        const docSnap = await getDoc(doc(db, 'todos', uid))

        if (docSnap.exists()) {
          const newData = docSnap.data()
          lastId = newData.tasks.at(-1).id
          setData(newData)
        } else {
          setDoc(doc(db, 'todos', uid), loremTasks)
        }
      }
      setLoading(false)
    })
  }, [])


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
        id: ++lastId,
      })
      setDoc(doc(db, 'todos', uid), newData)
      setData(newData)
    },
    // integer
    toggleTaskStatus: function (index) {
      let newData = {
        tasks: [...data.tasks],
        removed: [...data.removed],
      }
      newData.tasks[index].active = !(newData.tasks[index].active)
      setDoc(doc(db, 'todos', uid), newData)
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
      setDoc(doc(db, 'todos', uid), newData)
      setData(newData)
    },
    resetData: function () {
      setDoc(doc(db, 'todos', uid), loremTasks)
      lastId = loremTasks.tasks.at(-1).id
      setData(JSON.parse(JSON.stringify(loremTasks)))
    }
  }

  return (
    <div>
      {loading && 'Loading your tasks...'}
      {!loading &&
        <div className='App'>
          <div className='left'>
            <TaskInput addTask={actions.addTask} />
            <List tasks={data.tasks} toggleTaskStatus={actions.toggleTaskStatus} />
          </div>
          <div className='right'>
            <button onClick={actions.removeAllCompletedTasks}>Remove Completed Tasks</button>
            <button onClick={actions.resetData}>Reset User Data</button>
            <Removed removed={data.removed} />
          </div>
        </div>
      }
    </div>
  );
}

export default App;
