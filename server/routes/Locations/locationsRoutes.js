const { Router } = require('express')

const {
  getAllLocationHandler,
  // saveApiLocationHandler
} = require('../../Handlers/Locations/locationsHandlers.js')

const router = Router()

router.get('/', getAllLocationHandler)
// router.post('/', saveApiLocationHandler); // se usa para localizacion, timezone

module.exports = router
