const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin%40123@cluster0.nim4yef.mongodb.net/Todo-app')

const UserSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const UserModel = mongoose.model("Todos", UserSchema)

module.exports = {
    UserModel
}