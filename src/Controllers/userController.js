const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken")


const validBody = function (value) {

    if (typeof value === 'undefined' || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim().length == 0) {
        return false
    }
    return true

}

let nameValidator = function (name) {
    let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
    return regx.test(name);
}

const validRequest = function (data) {
    return Object.keys(data).length > 0
}

let mobileValidation = function validatePhoneNumber(phone) {
    var re = /^[0-9]{10}$/;

    return re.test(phone);
}

let validateEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};


let validatePassword = (password) => {
    var pass = /^(?=.*?[A-Za-z0-9#?!@$%^&*-]).{8,15}$/
    return pass.test(password)
}

const createUser = async function (req, res) {
    try {
        let data = req.body
        let { title, name, phone, email, password} = data

        if (!validRequest(data)) { return res.status(400).send({ status: false, message: "body can't be empty" }) }

        if (!validBody(title)) { return res.status(400).send({ status: false, message: "enter the tile" }) }

        if (!validBody(name)) { return res.status(400).send({ status: false, message: "enter the name" }) }

        if (!validBody(email)) { return res.status(400).send({ status: false, message: "enter the email" }) }

        if (!validBody(phone)) { return res.status(400).send({ status: false, message: "enter the phone no." }) }

        if (!validBody(password)) { return res.status(400).send({ status: false, message: "enter the password" }) }

        if (!mobileValidation(phone)) { return res.status(400).send({ status: false, message: "enter valid phone no." }) }

        if (!nameValidator(name)) { return res.status(400).send({ status: false, message: "please enter name correctly" }) }

        if (!validateEmail(email)) { return res.status(400).send({ status: false, message: "enter valid email" }) }

        if (!validatePassword(password)) { return res.status(400).send({ status: false, message: "enter valid password" }) }

        if(data.address){
        if(typeof data.address !== "object")return res.status(400).send({status:false,msg:"address must be in the form of object"})}

        if (!["Mr", "Mrs", "Miss"].includes(data.title.trim())) { return res.status(400).send({ status: false, msg: "title must be Mr, Mrs or Miss" }) }

        let Email = await userModel.findOne({ email: email })
        if (Email) return res.status(409).send({ status: false, message: "email is already in use" })

        let number = await userModel.findOne({ phone: phone })
        if (number) return res.status(409).send({ status: false, message: "PHONE NO. is already in use" })

        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, data: savedData });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
    }
}

module.exports.createUser = createUser



const loginUser = async function (req, res) {
    try {
        let data = req.body;
        let { email, password } = data;

        if (!validRequest(data)) { return res.status(400).send({ status: false, message: "required details (email and password) are missing" }) }

        if (!validBody(email)) { return res.status(400).send({ status: false, message: "enter the email" }) }

        if (!validBody(password)) { return res.status(400).send({ status: false, message: "enter the password" }) }

        if (!validateEmail(email)) { return res.status(400).send({ status: false, message: "enter valid email" }) }

        if (!validatePassword(password)) { return res.status(400).send({ status: false, message: "enter valid password" }) }


        let Email = await userModel.findOne({ email: email })
        if (!Email) return res.status(400).send({ status: false, message: "user not found" })

        if (Email.password != password)
            return res.status(401).send({ status: false, msg: "invalid password" })    

            let key = jwt.sign(
            {
                id: Email._id.toString(),
                },
                "bm-8",{expiresIn:"3h"});
        
        
        res.setHeader("x-api-key", key)
        res.status(200).send({ status: true, key: key })

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
};

module.exports.loginUser = loginUser