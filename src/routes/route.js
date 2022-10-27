
const express = require('express');
const router = express.Router();


const userController = require('../Controllers/userController.js')
const bookController = require('../Controllers/bookController.js')
const reviewController = require('../Controllers/reviewController')

const { Authentication, Authorization, AuthorizationToQuary} = require("../middlewares/authentication")

router.post("/register", userController.createUser)

router.post("/login", userController.loginUser)

router.post("/books",Authentication, AuthorizationToQuary,  bookController.createBook)

router.get("/books", Authentication, bookController.getBooks)

router.get("/books/:bookId",Authentication, bookController.getBooksDataById)

router.put("/books/:bookId" ,Authentication, Authorization, bookController.updateBook)

router.delete("/books/:bookId",Authentication, Authorization, bookController.deleteById)

router.post("/books/:bookId/review", reviewController.createReview)

router.put("/books/:bookId/review/:reviewId" ,reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)



module.exports = router;


// const express = require('express');
// const router = express.Router();

// const userController = require('../Controllers/userController.js')
// const Authentication = require("../middlewares/authentication.js")
// const bookController = require('../Controllers/bookController.js')
// const reviewController = require('../Controllers/reviewController.js')

// router.post("/register", userController.createUser)

// router.post("/login", userController.loginUser)

// router.post("/books", Authentication, AuthorizationToQuary, bookController.createBook)

// router.get("/books", Authentication, bookController.getBooks)

// router.get("/books/:bookId", Authentication, bookController.getBooksDataById)

// router.put("/books/:bookId", Authentication, Authorization, bookController.updateBook)

// router.delete("/books/:bookId",  Authentication, Authorization, bookController.deleteById)

// router.post("/books/:bookId/review", reviewController.createReview)