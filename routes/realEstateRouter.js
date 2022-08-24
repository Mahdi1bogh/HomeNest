import express from 'express';
import {
  createEstate,
  deleteEstate,
  deleteUserEstate,
  getEstateById,
  getEstates,
  getEstatesDates,
  searchEstates,
  updateEstate,
} from '../controllers/EstateController.js';
import { Auth } from '../middleware/Auth.js';
import { isAdmin } from '../utils.js';

const realEstateRouter = express.Router();

realEstateRouter.get('/dates', Auth, isAdmin, getEstatesDates);
//********GUEST
realEstateRouter.get('/', getEstates); // All Estates

realEstateRouter.get('/search', searchEstates); // Search Estates by Filter
realEstateRouter.get('/:id', getEstateById); //Get singular Estate

//********OWNER
realEstateRouter.post('/', Auth, createEstate); // Create Estate

realEstateRouter.patch('/:id', Auth, updateEstate); //Update Estate
realEstateRouter.delete('/:id', Auth, deleteEstate); // Delete Estate

//********Admin
realEstateRouter.delete('/admin/:id', Auth, isAdmin, deleteUserEstate); // Delete Estate
export default realEstateRouter;
