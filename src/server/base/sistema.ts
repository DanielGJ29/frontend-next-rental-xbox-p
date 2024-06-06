import { INewUser } from '@/interfaces/sistema';

import { getUserList, getUserById, getAllRoles, newUser, EditUser, deleteUserById, getAllMenu } from '../endpoints/sistema';

export class SistemaAPI implements SistemaAPI {
  //CRUD User
  getUserList = () => {
    return getUserList();
  };

  newUser = (formData: FormData) => {
    return newUser(formData);
  };

  EditUser = (id: number, formData: FormData) => {
    return EditUser(id, formData);
  };

  getUserById = (id: number) => {
    return getUserById(id);
  };

  deleteUserById = (id: number) => {
    return deleteUserById(id);
  };

  //Roles
  getAllRoles = () => {
    return getAllRoles();
  };

  getAllMenu = () => {
    return getAllMenu();
  };
}
