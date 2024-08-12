const express = require('express');
const { storeRiskCheck } = require('../controllers/riskCheckController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/store-risk-check', authMiddleware, storeRiskCheck);

module.exports = router;
