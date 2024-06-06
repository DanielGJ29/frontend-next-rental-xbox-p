import {
  getAllConsoles,
  getAllConsolesNames,
  newConsolesNames,
  updateConsolesNames,
  getByIdConsolesNames,
  deleteByIdConsolesNames,
  getAllModels,
  newModels,
  updateModels,
  getByIdModels,
  deleteByIdModels
} from '../endpoints/consoles';

//Interface
import { INewNameconsoles } from '@/interfaces/consoles';

export class ConsolesAPI implements ConsolesAPI {
  getAllConsoles = () => {
    return getAllConsoles();
  };

  //CRUD NAME CONSOLES
  getAllConsolesNames = () => {
    return getAllConsolesNames();
  };

  newConsolesNames = (body: INewNameconsoles) => {
    return newConsolesNames(body);
  };
  updateConsolesNames = (id: number, body: INewNameconsoles) => {
    return updateConsolesNames(id, body);
  };

  getByIdConsolesNames = (id: number) => {
    return getByIdConsolesNames(id);
  };

  deleteByIdConsolesNames = (id: number) => {
    return deleteByIdConsolesNames(id);
  };

  //CRUD  Models
  getAllModels = () => {
    return getAllModels();
  };

  newModels = (body: INewNameconsoles) => {
    return newModels(body);
  };
  updateModels = (id: number, body: INewNameconsoles) => {
    return updateModels(id, body);
  };

  getByIdModels = (id: number) => {
    return getByIdModels(id);
  };

  deleteByIdModels = (id: number) => {
    return deleteByIdModels(id);
  };
}
