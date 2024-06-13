import { newClient, getClients, getByIdClients, updateByIdClient, deleteByIdClient } from '../endpoints/clients';

export class ClientAPI implements ClientAPI {
  //CRUD CLIENT
  newClient = (body: FormData) => {
    return newClient(body);
  };

  getClients = () => {
    return getClients();
  };

  getByIdClients = (id: number) => {
    return getByIdClients(id);
  };

  updateByIdClient = (id: number, body: FormData) => {
    return updateByIdClient(id, body);
  };

  deleteByIdClient = (id: number) => {
    return deleteByIdClient(id);
  };
}
