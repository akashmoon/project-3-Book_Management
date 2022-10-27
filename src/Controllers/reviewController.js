
const mongoose  = require("mongoose");
const bookModel = require("../Models/bookModel.js")

const moment = require('moment')
const reviewModel = require("../Models/reviewModel.js")



let validateRating = (rating) => {
    var rate = /^[1-5]{1}$/;
    return rate.test(rating)}

let reviewedByValidator = function (reviewedBy) {
        let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
        return regx.test(reviewedBy);
    }

const createReview = async function (req, res) {
   try {
      const content = req.body;
      if (Object.keys(content).length === 0) {
         // console.log(err.message)
         return res.status(400).send({ status: false, msg: "no content in the document" });
      }
      const bookId= req.params.bookId


      let rBy= req.body.reviewedBy;
      let rAt= req.body.reviewedAt;
      let rat= req.body.rating;
      let rev= req.body.review
      
      
        
    if(!rAt){
         return res.status(400).send({ status: false, message: "please enter reviewedAt." }) 
    }

    if(!rat){
        return res.status(400).send({ status: false, message: "please enter a rating between 1 to 5." }) 
   }

   if(!rev){
    return res.status(400).send({ status: false, message: "please enter a review about the book." }) 
}
      if(rAt && rat && rev){

    if (!mongoose.Types.ObjectId.isValid(bookId)) { return res.status(400).send({ status: false, msg: "enter a valid book id" }) }
  
      if (!reviewedByValidator(rBy)) { return res.status(400).send({ status: false, message: "please enter reviewedBy correctly" }) }


      if (!validateRating(rat)) { return res.status(400).send({ status: false, message: "please enter a rating between 1 to 5 " }) }

      

      const book = await bookModel.findById(bookId);  
      if(!book || book.isDeleted === true){return res.status(404).send({status:false, msg: "no such book exists"})};

      
    
         let v= {bookId: req.params.bookId ,reviewedBy: rBy,reviewedAt: rAt, rating: rat,review: rev}
        
         let findBooks = await bookModel.findOne({ _id: bookId, isDeleted: false }, { deletedAt: 0, __v: 0 });
        
         const savedData = await reviewModel.create(v);
         await bookModel.findByIdAndUpdate({ _id: bookId }, { reviews: book.reviews + 1 })

         let updateReviewCount= await reviewModel.count({bookId: bookId, isDeleted:false})
     
      
         const combinedDetails = { _id: findBooks._id , title: findBooks.title , excerpt: findBooks.excerpt, userId: findBooks.userId, category: findBooks.category, subcategory: findBooks.subcategory, isDeleted: findBooks.isDeleted, reviews: updateReviewCount, releasedAt: findBooks.releasedAt, createdAt:findBooks.createdAt, updatedAt: findBooks.updatedAt , reviewsData: [savedData] }
        
         res.status(201).send({ status: true, data: combinedDetails })
        }
        else{
          return res.status(400).send({status:false, msg: "please provide reviewedBy, reviewedAt, rating, and a review to create a review, reviewedBy field is not necessary if you want to create a review as a guest "})
        }
    }
   catch (error) {
      console.log(error)
      return res.status(500).send({ status: false, errorName: error.name, msg: error.message });
   }
}



let updateReview = async function (req, res) {

    try {

        let body = req.body
        let bookID = req.params.bookId;
        let reviewID = req.params.reviewId;
        let check= Object.keys(bodyData)
        let  arr=['reviewedBy','review','rating'] 

        if (!mongoose.Types.ObjectId.isValid(bookID)) { return res.status(400).send({ status: false, msg: "enter a valid book id" }) }

        if (!mongoose.Types.ObjectId.isValid(reviewID)) { return res.status(400).send({ status: false, msg: "enter a valid review id" }) }

        if (Object.keys(bodyData).length == 0) { return res.status(400).send({ status: false, msg: "Enter the Books details" }) }
     
        for(let i=0;i<check.length;i++){
        
        let update=arr.includes(check[i]) 
        if(!update)return res.status(400).send({status:false,msg:"you can only update  review,rating and reviewedBy fields."})
        }


        const book = await bookModel.findOne({ _id: bookID, isDeleted: false }).lean()
        if (!book) res.status(404).send({ status: false, msg: "No book found" })

        let data = {};

        if (body.review) {
            data["review"] = body.review
        }

        if (body.rating) {
            data["rating"] = body.rating
        }

        if (body.reviewedBy) {
            data["reviewedBy"] = body.reviewedBy
        }

        let updatedReview = await reviewModel.findOneAndUpdate({ _id:reviewID, isDeleted: false }, { $set: data }, { new: true }).select({isDeleted:0,updatedAt:0,createdAt:0})
        if (!updatedReview) return res.status(404).send({ status: false, msg: "Review Data Not found" })
        
        book["reviewsData"]=updatedReview
       return res.status(200).send({ status: true, msg:"updated review document", data: book })

    } catch (err) {
        console.log(err.message)
        res.status(500).send({ status: false, msg: err.message })
    }
}

const deleteReview = async function (req, res) {
   try {
       const reviewID = req.params.reviewId;
       const bookID= req.params.bookId

       if (!mongoose.Types.ObjectId.isValid(bookID)) { return res.status(400).send({ status: false, msg: "enter a valid book id" }) }

       if (!mongoose.Types.ObjectId.isValid(reviewID)) { return res.status(400).send({ status: false, msg: "enter a valid review id" }) }

       const bookSearch = await bookModel.findById(bookID);
         
       if (!bookSearch || bookSearch.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such book exists" }) };//validation1
       const reviewSearch = await reviewModel.findById(reviewID);
        if (!reviewSearch || reviewSearch.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such review exists" }) }

       const ReviewBookCheck = await reviewModel.findOne({ _id: reviewID, bookId: bookID, isDeleted: false })

       const d = new Date
       dateTime = d.toLocaleString();
       

       if (!ReviewBookCheck) { return res.status(404).send({ status: false, msg: "review not matching with the given book" }) }
       else
       {
        await bookModel.findByIdAndUpdate({ _id: bookID }, { reviews: bookSearch.reviews - 1 });

        await reviewModel.findByIdAndUpdate(reviewID, { $set: { isDeleted: true, deleted: dateTime ,new: true }});
       return res.status(200).send({ status: true, msg: "review deleted successfully" });
        }
       

   } catch (error) {
       return res.status(500).send({ status: false, error: error.name, msg: error.message })
   } 
}
       
module.exports.createReview= createReview
module.exports.updateReview= updateReview
module.exports.deleteReview= deleteReview