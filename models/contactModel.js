const { type } = require("express/lib/response")
const mongoose = require("mongoose")
const moment = require("moment-timezone");


const contactSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type:String,
        required: [true, "Please add the contact email"]
    },
    phone: {
        type:String,
        required: [true, "Please add the contact phone number"]
    }
},{
    timestamps: true,
})

contactSchema.methods.toJSON = function () {
    const obj = this.toObject();
    obj.createdAt = moment(obj.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    obj.updatedAt = moment(obj.updatedAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    return obj;
};

module.exports = mongoose.model("Contact",contactSchema)