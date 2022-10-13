const express = require("express")
const dotenv =  require("dotenv")
const UserRoutes = require('./routes/user.routes')
const PostRoutes = require('./routes/post.routes')
const MessagesRoutes = require('./routes/messages.routes')
const AuthRoutes = require('./routes/auth.routes')
const {connect} = require('./config/db')
const bodyParser = require('body-parser')
const morgan = require('morgan')

dotenv.config({path: "./config/private.env"})

connect(process.env.URI)

const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))


app.use('/smAPI/v1/user', UserRoutes)
app.use('/smAPI/v1/posts', PostRoutes)
app.use('/smAPI/v1/messaging', MessagesRoutes)
app.use('/smAPI/v1/auth', AuthRoutes)

const PORT = 9000

app.listen(process.env.PORT, ()=>{
    console.log(`App Is Running On PORT:${PORT}`)
})