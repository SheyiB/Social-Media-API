const {
 createMessage, getConversation, getUserMessages } = require("../controllers/messages");

const express = require("express");


const router = express.Router();

router.post("/", createMessage);
router.get('/:user1/:user2', getConversation);
router.get('/:id', getUserMessages);


module.exports = router;
