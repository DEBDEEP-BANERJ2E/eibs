const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Route to create a wallet card
router.post('/createWalletCard', walletController.createWalletCard);

module.exports = router;
