import * as express from 'express'
import CountryController from '../controllers/api/v1/countryController'
import PlaceController from '../controllers/api/v1/placeController'

const router = express.Router()

// Country
router.get('/api/v1/countries', CountryController.index)
router.get('/api/v1/countries/:id', CountryController.show)

// Province
router.get('/api/v1/countries', CountryController.index)
router.get('/api/v1/countries/:id', CountryController.show)

// City
router.get('/api/v1/countries', CountryController.index)
router.get('/api/v1/countries/:id', CountryController.show)

// Place
router.get('/api/v1/places', PlaceController.index)
router.get('/api/v1/places/:id', PlaceController.show)

// Data type

export default router
