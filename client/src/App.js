import React, { useEffect, useState } from 'react'

const App = () => {
  const [backendData, setBackendData] = useState([{}])
  console.log(backendData)

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        setBackendData(data)
      })
  }, []) // only run on the first render of component.

  return (
    <div>
      {typeof backendData.users === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  )
}

export default App
