const express = require('express')
const { getContacts, createContacts, getContactsById, updateContacts, deleteContacts } = require('../controllers/contactController')
const validateToken = require("../middleware/validateTokenHandler")
const router = express.Router()


router.use(validateToken);
router.route("/").get(getContacts).post(createContacts)

router.route("/:id").get(getContactsById).put(updateContacts).delete(deleteContacts)

module.exports = router
