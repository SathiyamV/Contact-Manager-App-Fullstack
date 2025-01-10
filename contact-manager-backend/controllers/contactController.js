const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const contactModel = require("../models/contactModel");

//@route GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
        res.status(401);
        throw new Error("User not authenticated");
    }
    
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@route GET /api/contacts/:id
const getContactsById = asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    res.json(contact)
});

//@route POST /api/contacts
const createContacts = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !phone) {
        res.status(400);
        throw new Error("Name and phone are mandatory");
    }

    const contact = await Contact.create({
        name,
        email: email || "", // Handle empty email
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@route PUT /api/contacts/:id
const updateContacts = asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update others contacts")
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updateContact)
})

//@route DELETE /api/contacts/:id
const deleteContacts = asyncHandler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete others contacts")
    }

    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact)
})

//@route GET /api/contacts/search
const searchContacts = asyncHandler(async (req, res) => {
    const { query } = req.query;
    const contacts = await Contact.find({
        $and: [
            { user_id: req.user.id },
            {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { phone: { $regex: query, $options: 'i' } }
                ]
            }
        ]
    });
    res.json(contacts);
});

module.exports = {
    getContacts,
    getContactsById,
    createContacts,
    updateContacts,
    deleteContacts,
    searchContacts
}