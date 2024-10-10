const axios = require('axios');
require('dotenv').config();

exports.getChatbotResponse = async (req, res) => {
  const { userMessage } = req.body; // Get the user message from the request body
  const apiKey = process.env.API_KEY; // Your API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: `As a maternal health expert, please answer the following question in the context of maternal health: ${userMessage}` }] }]
  };

  try {
    const response = await axios.post(url, requestBody);
    const botResponse = response.data.candidates[0].content.parts[0].text;
    res.status(200).json({ botResponse }); // Send back the bot response
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    res.status(500).json({ error: 'Failed to fetch chatbot response' });
  }
};
