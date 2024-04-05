import { useState,useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  //UseRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    
    let pass = ""
    let str = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+-=[]{};:,.<>/?\|`~"

    for (let i = 1; i <= length; i++) {
      let Char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(Char)
      
    }
    setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClibboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    passwordGenerator()} , [length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div
    className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'
    >
    <h1
    className='text-white text-cente my-3 '
    >Password Generator</h1>
    <div
    className='flex shadow rounded-lg overflow-hidden mb-6'
    >
    <input
    type='text'
    value={Password}
    className='outline-none w-full py-1 px-3'
    placeholder='Get Your Password'
    readOnly
    ref={passwordRef}
    />
    <button
    onClick={copyPasswordToClibboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
    >copy</button>
    </div>
    <div
    className='flex text-sm gap-x-1.5'
    >
      <div
      className='flex items-center gap-x-1'
      >
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length: {length}</label>
      </div>
      <input
      type='checkbox'
      defaultChecked={numberAllowed}
      id='numberInput'
      onChange={() => {
        setNumberAllowed((prev) => !prev);
      }}
      />
      <label>Numbers</label>
      <div
      className='flex items-center gap-x-1'
      >
      <input
      type='checkbox'
      defaultChecked={charAllowed}
      id='characterInput'
      onChange={() => {
        setCharAllowed((prev) => !prev);
      }}
      />
      <label>Characters</label>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
