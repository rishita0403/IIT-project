// routes/messageRouter.js
const express = require("express");
const router = express.Router();
const {getChatbotResponse} = require("../controllers/messageController");

router.post('/chatbot-response', getChatbotResponse);

module.exports = router;
