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
  deleteByIdModels,
  NewConsole,
  getByIdConsole,
  updateConsole,
  deleteConsole,
  getSerialNumberConsole,
  getGamepads,
  getByIdGamepads,
  newGamepad,
  updateGamepad,
  deleteByIdGamepad
} from '../endpoints/consoles';

//Interface
import { INewNameconsoles, INewConsole, INewModel, INewGamepad } from '@/interfaces/consoles';

export class ConsolesAPI implements ConsolesAPI {
  //CRUD CONSOLES
  getAllConsoles = () => {
    return getAllConsoles();
  };

  NewConsole = (body: FormData) => {
    return NewConsole(body);
  };

  getByIdConsole = (id: number) => {
    return getByIdConsole(id);
  };

  updateConsole = (id: number, body: FormData) => {
    return updateConsole(id, body);
  };

  deleteConsole = (id: number) => {
    return deleteConsole(id);
  };

  getSerialNumberConsole = () => {
    return getSerialNumberConsole();
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

  newModels = (body: INewModel) => {
    return newModels(body);
  };
  updateModels = (id: number, body: INewModel) => {
    return updateModels(id, body);
  };

  getByIdModels = (id: number) => {
    return getByIdModels(id);
  };

  deleteByIdModels = (id: number) => {
    return deleteByIdModels(id);
  };

  //CRUD GAMEPADS

  getGamepads = () => {
    return getGamepads();
  };

  getByIdGamepads = (id: number) => {
    return getByIdGamepads(id);
  };

  newGamepad = (body: INewGamepad) => {
    return newGamepad(body);
  };

  updateGamepad = (id: number, body: INewGamepad) => {
    return updateGamepad(id, body);
  };

  deleteByIdGamepad = (id: number) => {
    return deleteByIdGamepad(id);
  };
}
