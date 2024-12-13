const express = require('express')
const { getContacts, createContacts, getContactsById, updateContacts, deleteContacts } = require('../controllers/contactController')
const router = express.Router()

router.route("/").get(getContacts).post(createContacts)

router.route("/:id").get(getContactsById).put(updateContacts).delete(deleteContacts)

module.exports = router
