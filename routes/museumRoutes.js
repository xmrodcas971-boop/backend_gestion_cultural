// museumRoutes.js
const express = require('express');
const router = express.Router();
const museumController = require('../controllers/museumController');


// Las rutas más específicas SIEMPRE van antes que /:id.
router.get('/between', museumController.getMuseumsBetweenDates);
router.get("/budget", museumController.getMuseumsByBudgetRange);

// Rutas generales
router.get('/', museumController.getAllMuseums);
router.get('/:id', museumController.getMuseumById);
router.post('/', museumController.createMuseum);
router.put('/:id', museumController.updateMuseum);
router.delete('/:id', museumController.deleteMuseum);



module.exports = router;
