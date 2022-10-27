let jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const bookModel = require("../Models/bookModel");



//authentication
const Authentication = function (req, res, next) {
  try {
    let key = req.headers["x-api-key"];
    if (!key) key = req.headers["X-Api-Key"];
    if (!key) return res.status(400).send({ msg: "x-api-key header is required" });

    let auth =   jwt.verify(key, "bm-8")          
    if(!auth){return res.status(401).send({status:false, msg:error.message})};
    
     next()
       
  } catch (error) {
    if(error.message=="jwt expired") return res.status(403).send({status:false,msg:" Your token is expires "})
      return res.status(500).send({ status: false, error: error.name, msg: error.message }) 
  }
}

//authorisation

let Authorization = async function (req, res, next) {
  try {
    let logedInUserKey = req.headers["x-api-key"] || req.headers["X-Api-Key"];

    let decodeToken = jwt.verify( 
      logedInUserKey,
      "bm-8"
    );
    logedinUserID = decodeToken.id;
 
    requestBookId = req.params.bookId.toString()
    if (requestBookId.length != 24)
      return res.status(400).send({ msg: "enter valid bookid" });

    findBookID = await bookModel.findOne({ _id: requestBookId  });
    if (!findBookID) return res.status(404).send({ err: "Book not found " });

    let userID = findBookID.userId.toString();

    if (logedinUserID != userID)
      return res.status(403).send({ msg: "logedin user is not authorized " });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ err: error.message });
  }
};


let AuthorizationToQuary= async function (req, res, next) {
  try {
    let logedInUserKey = req.headers["x-api-key"] || req.headers["X-Api-Key"];

    let decodeToken = jwt.verify(
      logedInUserKey,
      "bm-8"
    );
    logedinUserID = decodeToken.id;
    
    requestUserId = req.body.userId //.toString();
    if(!requestUserId)requestUserId=req.query.userId //.toString();
    if(!requestUserId) return res.status(400).send({err:"please enter userID"}) //.toString();

    if(requestUserId.length != 24) return res.status(400).send({ msg: "enter valid userID" });

    UserID = await userModel.findOne({ _id: requestUserId });
    if (! UserID) return res.status(404).send({ err: "UserID not found " });

    let userID = UserID._id.toString();

    if (logedinUserID != userID)
      return res.status(403).send({ msg: "logedin user is not authorized To create book " });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ err: error.message });
  }
}; 


module.exports.Authentication = Authentication
module.exports.Authorization = Authorization
module.exports.AuthorizationToQuary=AuthorizationToQuary