const mongoose = require("mongoose");
const bookModel = require("../Models/bookModel")
const userModel = require("../Models/userModel")
const validator = require("../validator/validator.js")
const moment = require('moment');
const reviewModel = require("../Models/reviewModel");

const aws= require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })
    
})
}

const createBook = async function (req, res) {

    try {
        let data = req.body
        const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "Body should not be Empty.. " })
        }

        if (!title || title.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide title ⚠️⚠️" })
        else
            data.title = data.title.trim()

        if (!validator.isTitle(title)) {
            return res.status(400).send({ Status: false, message: "Please enter valid title ⚠️⚠️" })
        }

        if (title) {
            let checkTitle = await bookModel.findOne({ title: title })

            if (checkTitle) {
                return res.status(409).send({ Status: false, message: "Please provide another title, this title has been used ⚠️⚠️" })
            }
        }


        if (!excerpt || excerpt.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide excerpt ⚠️⚠️" })
        else
            data.excerpt = data.excerpt.trim()

        if (!validator.isValid(excerpt)) {
            return res.status(400).send({ Status: false, message: "Please enter valid excerpt ⚠️⚠️" })
        }

        if (!userId || userId.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide userId ⚠️⚠️" })
        else
            data.userId = data.userId.trim()

        let UserId = data.userId
        let FindId = await userModel.findById(UserId)
        if (!FindId) return res.status(400).send({ status: false, msg: 'UserId does not exist' })

        // if (!FindId.length == 24)
        //     return res.status(400).send({ status: false, msg: 'UserId is not valid' })

        if (!ISBN || ISBN.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide ISBN ⚠️⚠️" })
        else
            data.ISBN = data.ISBN.trim()

        if (!validator.ISBNvalidate(ISBN)) {
            return res.status(400).send({ Status: false, message: "Please enter valid ISBN ⚠️⚠️" })
        }

        if (ISBN) {
            let checkISBN = await bookModel.findOne({ ISBN: ISBN })

            if (checkISBN) {
                return res.status(409).send({ Status: false, message: "Please provide another ISBN, this ISBN has been used ⚠️⚠️" })
            }
        }


        if (!category || category.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide category ⚠️⚠️" })
        else
            data.category = data.category.trim()

        if (!validator.Valid(category)) {
            return res.status(400).send({ Status: false, message: "Please enter valid category ⚠️⚠️" })
        }


        if (!subcategory || subcategory.length == 0)
            return res.status(400).send({ Status: false, message: "Please provide subcategory ⚠️⚠️" })
        else
            data.subcategory = data.subcategory

        if (!validator.Valid(subcategory)) {
            return res.status(400).send({ Status: false, message: "Please enter valid subcategory ⚠️⚠️" })
        }



        if (!releasedAt || releasedAt.trim() == "")
            return res.status(400).send({ Status: false, message: "Please provide releasedDate ⚠️⚠️" })
        else
            data.releasedAt = data.releasedAt.trim()

        if (!moment(releasedAt, "YYYY-MM-DD", true).isValid())
            return res.status(400).send({
                status: false,
                msg: "Enter a valid date with the format (YYYY-MM-DD).",
            })

            let files= req.files
            if(files && files.length>0){
                //upload to s3 and get the uploaded link
                // res.send the link back to frontend/postman
                let uploadedFileURL= await uploadFile( files[0] )
                data.bookCover=uploadedFileURL
            }
        let bookCreated = await bookModel.create(data)
        res.status(201).send({ status: true, data: bookCreated })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

     //validation for ObjectId
     const isValidObjectId = function (objectId) {
        return mongoose.Types.ObjectId.isValid(objectId);
       }


const getBooks = async function (req, res) {
    try {
        
          let getQueryData = req.query;
      
          const { userId, category, subcategory } = getQueryData;
      
          if (Object.keys(getQueryData).length > 0) {
            if (!userId && !category) {
              return res.status(400).send({
                status: false,
                message: "Please enter value like  'userId','category'",
              });
            }
          }
      
          //value to show in response
          let valueToShow = {
            _id: 1,
            title: 1,
            excerpt: 1,
            userId: 1,
            category: 1,
            releasedAt: 1,
            reviews: 1,
          };
      
          const findBooks = await bookModel
            .find({ $and: [getQueryData, { isDeleted: false }] })
            .select(valueToShow)
            .sort({ title: 1 });
      
          if (findBooks.length == 0) {
            return res.status(404).send({ status: false, message: "No Book found" });
          }
      
          return res
            .status(200)
            .send({ status: true, message: "Book List", data: findBooks });
        } catch (error) {
          res.status(500).send({ status: false, message: error.message });
        }
      };
  
  
    
    const getBooksDataById = async function(req,res){
        try{
            let getbookId = req.params.bookId;

            if (!isValidObjectId(getbookId)) {
              return res.status(400).send({ status: false, message: "BookId is in invalid format." })
            }
            //try to find book from that id
            let findBooks = await bookModel.findOne({ _id: getbookId, isDeleted: false }, { deletedAt: 0, __v: 0 });
            if (!findBooks) { return res.status(404).send({ status: false, msg: "book not found" }) }

        
            let getReviews = await reviewModel.find({bookId: getbookId, isDeleted: false}).select({_id:1, bookId:1, reviewedBy:1, reviewedAt:1, rating:1, review:1});
            //if doc not found
           
            let updateReviewCount= await reviewModel.count({bookId: getbookId, isDeleted:false})

           
            const combinedDetails = { _id: findBooks._id , title: findBooks.title , excerpt: findBooks.excerpt, userId: findBooks.userId, category: findBooks.category, subcategory: findBooks.subcategory, isDeleted: findBooks.isDeleted, reviews: updateReviewCount, releasedAt: findBooks.releasedAt, createdAt:findBooks.createdAt, updatedAt: findBooks.updatedAt , reviewsData: getReviews }
            if (!findBooks) {
              return res.status(404).send({ status: false, message: "Book not found" });
            }
            return res.status(200).send({ status: true, message: "Books list", data: combinedDetails});
        } 
        catch (error) {
          res.status(500).send({ status: false, message: error.message });
        }
      }

let updateBook=async function (req,res){
    try {
        let ISBNvalidate = function (ISBN) {
            let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
            return ISBNRegex.test(ISBN)
          }

        const isValidDate = function (Date) {
            let trimDate=Date.trim()
            if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(trimDate)) return true
        }
        let data=req.body
        let book=req.params.bookId 
        const findBook = await bookModel.findOne({_id:book,isDeleted:false}).lean()
        if(!findBook) return res.status(404).send({ status: false, msg:"No book found"  })

        let temp={};
    
        if(data.title){
            trimTitle=data.title.trim()
            findBook.title=trimTitle
            const checkTitle = await bookModel.findOne({title:trimTitle})
            if(checkTitle)return res.status(409).send({status:false,msg:"this title:"+trimTitle +" "+"already present in database"})
            temp["title"]=trimTitle
        }
        if(data.excerpt){
            trimExcerpt=data.excerpt.trim()
            findBook.excerpt=data.excerpt
            temp["excerpt"]=data.excerpt
        }
        if(data.ISBN){
            trimISBN=data.ISBN.trim()
            findBook.ISBN=trimISBN
           if( !ISBNvalidate(trimISBN))return res.status(400).send({status:false,msg:" Enter valid ISBN "})
            const checkISBN = await bookModel.findOne({ISBN:trimISBN})
            if(checkISBN)return res.status(409).send({status:false,msg:"this ISBN:"+trimISBN +" "+"already present in database"})
            temp["ISBN"]=trimISBN
        }
         if(data.releasedAt){
            trimReleasedAt=data.releasedAt.trim()
           if(! isValidDate(trimReleasedAt))return res.status(400).send({status:false,msg:"Enter valid date (YYYY-MM-DD) "})
            findBook.releasedAt=trimReleasedAt
            temp["releasedAt"]=trimReleasedAt
         }

        let update=await bookModel.findOneAndUpdate({_id:book},{$set:temp},{new:true})
        return res.status(201).send({status:true,msg:"success",data:update})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, msg: error.message })
    }
}


const deleteById = async function (req, res) {
    try {
        const id = req.params.bookId;
        const book = await bookModel.findById(id);
        if (!book || book.isDeleted === true) { return res.status(404).send({ status: false, msg: "no such book exists" }) };//validation1

        const d = new Date; 
        const dateTime = d.toLocaleString();

        await bookModel.findByIdAndUpdate(id, { $set: { isDeleted: true, deletedAt: dateTime } });
        return res.status(200).send({ status: true, msg: "book deleted successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, error: error.name, msg: error.message })
    }
}

module.exports.createBook = createBook
module.exports.updateBook = updateBook
module.exports.deleteById = deleteById
module.exports.getBooks = getBooks
module.exports.getBooksDataById = getBooksDataById