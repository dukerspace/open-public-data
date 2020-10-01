import * as express from 'express'
import {
  PlaceController,
  ProvinceController,
  CityController
} from '../controllers/api/v1'
import CountryController from '../controllers/api/v1/countryController'

const router = express.Router()
const country = new CountryController()
const province = new ProvinceController()
const city = new CityController()
const place = new PlaceController()

// Country
router.get('/air/v1/countries', country.index)
router.get('/air/v1/countries/:id', country.show)
router.get('/air/v1/countries/:id/province', country.show)

// Province
router.get('/air/v1/provinces', province.index)
router.get('/air/v1/provinces/:id', province.show)

// City
router.get('/air/v1/cities', city.index)
router.get('/air/v1/cities/:id', city.show)

// Place
// PlaceController.index
router.get('/air/v1/places', place.index)
router.get('/air/v1/places/:id', place.show)

// Data type

export default router
