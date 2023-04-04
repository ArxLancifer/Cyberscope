const router = require('express').Router();
const coinsController = require('../controllers/coinsController')


router.post('/markets', coinsController.getListOfCoins);
router.get('/:coin_id', coinsController.getCoinDetails);

module.exports = router;