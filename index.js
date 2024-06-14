const express = require('express')
const app = express()
const { CreateTodo, UpdateTodo } = require('./types')
app.use(express.json())


app.post("/todo", function(req,res) {
    const title = req.body.title
    const description = req.body.description

    const validation = CreateTodo.safeParse({
        title,
        description
    })

    if( !validation.success ){
        res.status(411).json({
            message: "Wrong Inputs"
        })
        return
    }
})

app.get("/todos", function(req,res) {

})

app.put("/completed", function(req,res) {
    const body = req.body;
    const validation = UpdateTodo.safeParse(body)

    if( !validation.success ){
        res.status(411).json({
            message: "Wrong Inputs"
        })
        return
    }
})

app.listen(PORT,() => {
    console.log("Server Started")
})