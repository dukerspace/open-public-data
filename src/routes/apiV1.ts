import * as express from 'express'
import CountryController from '../controllers/api/v1/countryController'
import PlaceController from '../controllers/api/v1/placeController'

const router = express.Router()

// Country
router.get('/v1/air/countries', CountryController.index)
router.get('/v1/air/countries/:id', CountryController.show)

// Province
router.get('/v1/air/countries', CountryController.index)
router.get('/v1/air/countries/:id', CountryController.show)

// City
router.get('/v1/air/countries', CountryController.index)
router.get('/v1/air/countries/:id', CountryController.show)

// Place
router.get('/v1/air/places', PlaceController.index)
router.get('/v1/air/places/:id', PlaceController.show)

// Data type

export default router
