const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
const contactModel = require("../models/contactModel")


const getContacts = async(req,res)=>{
    const contacts = await Contact.find()
    res.status(200).json(contacts)
}

const getContactsById = asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    res.json(contact)
});

const createContacts = asyncHandler( async(req,res)=>{
    console.log(req.body)
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400);
        throw new Error ("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact)
})

const updateContacts = asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updateContact)
})

const deleteContacts = asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    await Contact.deleteOne();
    res.status(200).json(contact)
})

module.exports = {
    getContacts,
    getContactsById,
    createContacts,
    updateContacts,
    deleteContacts
}