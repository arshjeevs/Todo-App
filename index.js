const express = require('express')
const app = express()
const PORT = 3000
const { CreateTodo, UpdateTodo } = require('./types')
const { UserModel } = require('../Backend/db/index')
app.use(express.json())


app.post("/todo", async function(req,res) {
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

    const response = await UserModel.create({
        title,
        description,
        completed: false,
    })

    if(!response){
        res.status(500).json({
            message: "Something went wrong"
        })
        return
    }

    res.status(200).json({
        message: "Todo Created Successfully"
    })
})

app.get("/todos", async function(req,res) {
    const todos = await UserModel.find({})
    res.json({
        todos
    })
})

app.put("/completed", async function(req,res) {
    const body = req.body;
    const validation = UpdateTodo.safeParse(body)

    if( !validation.success ){
        res.status(411).json({
            message: "Wrong Inputs"
        })
        return
    }

    await UserModel.updateMany({
        _id: req.body.id
    },{
        completed: true
    })

    res.json({
        msg: "Updated"
    })

})

app.listen(PORT,() => {
    console.log("Server Started")
})