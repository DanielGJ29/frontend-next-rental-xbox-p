import { INewUser } from '@/interfaces/sistema';

import { getUserList, getUserById, getAllRoles, newUser, editUser, deleteUserById, getAllMenu } from '../endpoints/sistema';

export class SistemaAPI implements SistemaAPI {
  //CRUD User
  getUserList = () => {
    return getUserList();
  };

  newUser = (formData: FormData) => {
    return newUser(formData);
  };

  editUser = (id: number, formData: FormData) => {
    return editUser(id, formData);
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
