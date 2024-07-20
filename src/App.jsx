import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

import { v4 as uuidv4 } from 'uuid';
localStorage.setItem('value', 'alltodos')

function App() {
  const [todo, setTodo] = useState('')
  const [allTodos, setAllTodos] = useState([])
  const [showfinished, setShowfinished] = useState(false)
  const inputRef = useRef(null);

  // useEffect(() => {
  //     saveLS(allTodos);
  //     console.log("I ran")
  // }, [allTodos]);



  const toggolefinished = () => {
    setShowfinished(!showfinished);
    console.log(showfinished);
  }



  const saveLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(allTodos))
  }

  useEffect(() => {
    setTodo('Enter a todo');
    let str = localStorage.getItem("todos")
    if (str) {
      let data = JSON.parse(str);
      setAllTodos(data)
    }
  }, [])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = (e) => {
    if (todo != "") {
      setAllTodos([...allTodos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("")
    saveLS()
  }


  const handleDone = (e) => {
    const id = e.target.name;

    const newTodos = [...allTodos]

    newTodos.map(item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
    })
    setAllTodos(newTodos)
    saveLS();
  }

  const handleDelete = (e, id) => {
    let newtodos = allTodos.filter(item => item.id !== id);
    setAllTodos(newtodos)
    saveLS(allTodos);
  }


  const handleEdit = (e, id) => {

    let t = allTodos.filter(i => i.id === id);
    setTodo(t[0].todo)
    let newtodos = allTodos.filter(item => item.id !== id);
    setAllTodos(newtodos)
    inputRef.current.focus()
    saveLS(allTodos);

  };
  return (
    <>
      <div className='mx-3 md:box flex flex-col gap-2 rounded-lg my-4 md:mx-auto  p-2text-purple-700 bg-white md:w-[50vw] '>
        <div className='flex flex-col items-center'>
          <span className=' font-bold text-xl'>iTodo- All your todos at one place </span>
        </div>

        <span className='font-bold text-lg ml-2 ' > Add a Todo</span>

        <div className="addtodo rounded-xl md:w-[45vw]  w-[90vw] mx-auto  ml-2  flex flex-col gap-[20px] justify-between bg-purple-300 p-2">

          <input type="text" onChange={handleChange} ref={inputRef} value={todo} className='rounded-lg  h-[6vh] md:w-[43vw]  ml-2 border-black  ' />

          <button onClick={handleAdd} className=' bg-purple-700 rounded-lg p-1 md:w-[35vw] w-[70vw] mx-auto text-white font-bold hover:bg-blue-800 hover:scale-105'>
            <div className='flex gap-4 items-center justify-center'>
              Save <FaSave />
            </div>

          </button>


        </div>

        <div className='h-[70vh] w-[60vw]'>

          <div className='ml-2 flex gap-2 m-3 items-center font-medium text-b'>
            <input type="checkbox" name="" id="" checked={todo.isCompleted} onChange={toggolefinished} />
            <span> Show finished  </span>
            <FaCheckDouble />
          </div>
          <span className='font-bold text-lg ml-2 '> Your Todos</span>

          {allTodos.length == 0 && <div className='mx-4 my-2'>No todos to display !</div>}
          <div className='lowerbox ' >

            <ul className='ml-3 overflow-y-auto h-[45vh] my-2 md:w-[45vw] w-[85vw]'>
              {allTodos.map(item => (
                (showfinished || !item.isCompleted) && (
                  <li 
                    key={item.id}
                    className='flex gap-2 md:w-[40vw] w-[85vw] bg-purple-200 p-2 rounded-xl my-2 px-3 justify-between  items-center'
                  >
                    <div className="desc md:w-[40vw] w-[40vw] flex justify-between items-center font-medium mx">


                      <div className={item.isCompleted ? "line-through flex gap-2 w-[40vw] md:w-[30vw]" : "flex gap-2 w-[40vw] md:w-[30vw]  "}>
                        <input
                          type="checkbox"
                          onChange={handleDone}
                          className='mx-1 min-h-[4vh]'
                          name={item.id}
                          checked={item.isCompleted}
                        />
                        {item.todo}
                      </div>
                    </div>

                    <div className='buttons md:w-[60vw] w-[20vw] flex gap-2 '>
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className='bg-blue-700 rounded-lg px-3 py-1 h-[5vh] text-lg justify-center flex text-white font-bold hover:bg-blue-800 hover:scale-105'
                      >
                        <FaEdit />
                      </button>

                      <button
                        name={item.id}
                        onClick={(e) => handleDelete(e, item.id)}
                        className='bg-red-700 rounded-lg px-3 py-1 h-[5vh]  text-lg text-center  flex text-white pb-1 justify-center font-bold hover:scale-105'
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </li>
                )
              ))}
            </ul>
          </div>

        </div>
      </div>

    </>
  )
}

export default App