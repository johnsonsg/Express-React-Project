const express = require('express')
const app = express()

// Routes
app.get('/api', (req, res) => {
  res.json({ users: ['userOne', 'userTwo', 'userThree', 'userFour'] })
})

// port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on Port: ${port}`))

// app.listen(5000, () => {
//   console.log('Server started on port 5000')
// })
