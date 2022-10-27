const moment = require('moment')
const mongoose  = require("mongoose");

const isValid = function (value){
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true
  }

const isValidUrl = function (value) {
  const regEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  const result = regEx.test(value)
  return result
}

const isValidCharacterLimit2to8 = function (value) {
  const regEx = /^\s*([a-zA-Z]){2,8}\s*$/
  const result = regEx.test(value)
  return result
}

const isValidCharacterLimit2to100 = function (value) {
  const regEx = /^\s*([a-zA-Z\s\,\.]){2,100}\s*$/
  const result = regEx.test(value)
  return result
}

const isValidNumber = function (value) {
  const regEx = /^\s*\91([0-9]){10}\s*$/
  const result = regEx.test(value)
  return result
}

const isValidEmail = (value) => {
  if (typeof value === "undefined" || value === null) return false
  const regEx = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
  const result = regEx.test(value)
  return result
}

function isArrString(x) {
  if (!x) { return false };
  if (!Array.isArray(x)) { return false };
  if (x.length === 0) { return false };
  for (let i = 0; i < x.length; i++) {
    if (typeof x[i] !== "string") { return false };
    if (x[i].trim().length !== x[i].length) { return false };
  }
  return true;
}

let Valid = function (name) {
  let regex = /^[.a-zA-Z\s,-]+$/
  return regex.test(name)
}

let isTitle = function isTitle(x) {
  const regEx = /^\s*(?=[A-Z])*[\w\.\s]{2,64}\s*$/   //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
  const result = regEx.test(x)
  return result;
}


let ISBNvalidate = function (ISBN) {
  let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
  return ISBNRegex.test(ISBN)
}

let validateRating = (rating) => {
  var rate = /^(?=.*?[0-5])$/
  return rate.test(rating)}

  function isBody(x){
    if(!x){return false}
    if(x.trim().length === 0 || x.trim().length <2){return false}
    const regEx = /^\s*[0-9!@#$%^&*\.\-\_\s]{1,}\s*$/
    if(regEx.test(x)){return false};
    return true;}

    function isName(x){
      const regEx = /^\s*(?=[A-Z])*[\w\.\s]{2,64}\s*$/   //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
      const result = regEx.test(x)
      return result;
  }
  
  const isValidDate = function (Date) {
    if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(Date)) return true
}

module.exports.isValid = isValid
module.exports.isValidUrl = isValidUrl
module.exports.isValidCharacterLimit2to8 = isValidCharacterLimit2to8
module.exports.isValidCharacterLimit2to100 = isValidCharacterLimit2to100
module.exports.isValidNumber = isValidNumber
module.exports.isValidEmail = isValidEmail
module.exports.isArrString = isArrString
module.exports.Valid = Valid
module.exports.isTitle = isTitle
module.exports.ISBNvalidate = ISBNvalidate
module.exports.validateRating= validateRating
module.exports.isValidDate= isValidDate
module.exports.isName= isName



// const validateToUpdate = async function (req, res, next) {
//   try {
//       const data = req.body;
//       if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: "cannot update empty body" }) };
// const {title, excerpt, releasedAt}= data
//       if(title || excerpt|| releasedAt ){
//           if (!isName(data.title.trim())) { return res.status(400).send({ status: false, message: "title is can be alphnumeric with atleast 1st letter as uppercase, special chraracters not allowed except dot(.)" }) };
//    //updating trimmed value of title in request body
      
      
//      if (!isBody(data.excerpt.trim())) { return res.status(400).send({ status: false, msg: "excerpt body must have some content to update" }) };
    
//      if (!isValidDate(data.releasedAt.trim())) { return res.status(400).send({ status: false, msg: "please provide a date in the form of YYYY-MM-DD" }) };
    
//           if (!ISBNvalidate(data.ISBN.trim())) { return res.status(400).send({ status: false, msg: "please provide a valid ISBN number." }) };  //also validates for undefined and null cases
//       }else{
//         return res.status(400).send({ status: false, msg: "please provide title, excerpt, releasedAt to update"})
//       }
//       next();
//   } catch (error) {
//       console.log(error)
//      return res.status(500).send({ status: false, error: error.name, msg: error.message })
//   }
// }




// // let reviewedByValidator = function (reviewedBy) {
// //       let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
// //       return regx.test(reviewedBy);
// //   }

// //   const isValidReview = function (review) {
// //       const regEx = /^\s*([a-zA-Z0-9\s\,\.]){1,10000}\s*$/
// //       const result = regEx.test(review)
// //       return result
// //     }

   



// const revUpdate = async function (req, res, next) {
//   try {
//       const data = req.body;
//       let reviewID = req.params.reviewId
//       let bookID = req.params.bookId
      
//       if (Object.keys(data).length === 0) { return res.status(400).send({ status: false, msg: "cannot update empty body" }) };

//       if (!mongoose.Types.ObjectId.isValid(bookID)) { return res.status(400).send({ status: false, msg: "enter a valid book id" }) }

//       if (!mongoose.Types.ObjectId.isValid(reviewID)) { return res.status(400).send({ status: false, msg: "enter a valid review id" }) }

//       if(!bookID && !reviewID){return res.status(400).send({status: false, msg: "bookID or reviewID missing in params"})}
      
//       const {reviewedBy ,review , reviewedAt, rating} = data;

//       if (reviewedBy || review || reviewedAt|| rating){
//       if (!isName(data.reviewedBy)) { return res.status(400).send({ status: false, message: " reviewedBy can be alphnumeric with atleast 1st letter as uppercase, special chraracters not allowed except dot(.)" }) };
//    //updating trimmed value of title in request body
      
      
//      if (!isBody(data.review)) { return res.status(400).send({ status: false, msg: "please write a review for the book." }) };
    
//      if (!isValidDate(data.reviewedAt)) { return res.status(400).send({ status: false, msg: "please provide a date in the form of YYYY-MM-DD" }) };
    
//      if (!validateRating(data.rating)) { return res.status(400).send({ status: false, msg: "please provide a rating between 1 to 5." }) };  //also validates for undefined and null cases
//       }
//       else{
//         return res.status(400).send({ status: false, msg: "please provide reviewedBy, review, releasdeAt, rating or atleast one field to update."})
//       }
//       next();
//   } catch (error) {
//       console.log(error)
//      return res.status(500).send({ status: false, error: error.name, msg: error.message })
//   }
// }

// module.exports.validateToUpdate=validateToUpdate
// module.exports.revUpdate=revUpdate