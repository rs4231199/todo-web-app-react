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

function App() {
  const [data, setData] = useState(loremTasks)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState("Loading your tasks...")

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        uid = user.uid
        const docSnap = await getDoc(doc(db, 'todos', uid))

        if (docSnap.exists()) {
          setData(docSnap.data())
        } else {
          setDoc(doc(db, 'todos', uid), loremTasks)
        }
        setLoading(false)
      } else {
        setMsg("Server connection failed.")
      }
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
      })
      setData(newData)
      setDoc(doc(db, 'todos', uid), newData)
    },
    // integer
    toggleTaskStatus: function (index) {
      let newData = {
        tasks: [...data.tasks],
        removed: [...data.removed],
      }
      newData.tasks[index].active = !(newData.tasks[index].active)
      setData(newData)
      setDoc(doc(db, 'todos', uid), newData)
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
      setDoc(doc(db, 'todos', uid), newData)
    },
    resetData: function () {
      setData(loremTasks)
      setDoc(doc(db, 'todos', uid), loremTasks)
    }
  }

  return (
    <div>
      {loading && msg}
      {!loading &&
        <div className="App">
          <div className="left">
            <TaskInput addTask={actions.addTask} />
            <List tasks={data.tasks} toggleTaskStatus={actions.toggleTaskStatus} />
          </div>
          <div className="right">
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
