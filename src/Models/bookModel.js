const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;


const bookSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true, lowercase: true},

    excerpt: {type: String, required: true, lowercase: true}, 

    bookCover : {type: String},

    userId: {type: ObjectId, required: true, ref: "user"},

    ISBN: {type: String, required: true, unique: true},

    category: {type: String, required: true, lowercase: true},

    subcategory: [{type: String, required: true, lowercase: true}] },

    {timestamps: true })

    module.exports = mongoose.model('books', bookSchema)