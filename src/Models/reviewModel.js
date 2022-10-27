const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({

    bookId: { type: ObjectId, required: true, ref: 'books' },

    reviewedBy: { type: String, required: true, default: 'Guest', lowercase: true },

    reviewedAt: { type: Date, required: true},

    rating: { type: Number, required: true }, // new rating validator

    review: { type: String, lowercase: true },

    isDeleted: { type: Boolean, default: false }
},

    { timestamps: true })

module.exports = mongoose.model('BookReview', reviewSchema)

