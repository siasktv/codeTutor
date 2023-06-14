const { Router } = require('express');


const {
  getAllLocationHandler,
  saveApiLocationHandler,

} = require('../../Handlers/Locations/locationsHandlers');

const router = Router();

router.get('/', getAllLocationHandler);
router.post('/', saveApiLocationHandler);


module.exports = router;
