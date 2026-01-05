// museumRoutes.js
const express = require('express');
const router = express.Router();
const museumController = require('../controllers/museumController');

router.get('/', museumController.getAllMuseums);
router.get('/:id', museumController.getMuseumById);
router.post('/', museumController.createMuseum);
// router.put('/:id', museumController.updateMuseum);
// router.delete('/:id', museumController.deleteMuseum);

module.exports = router;
