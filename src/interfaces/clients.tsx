export interface IClient {
  id: string;
  name: string;
  lastName: string;
  motherLastName: string;
  email: string;
  userName: string;
  password: string;
  avatartUrl: string | File;
  role: string;
  city: string;
  colony: string;
  documents: {};
  municipality: string;
  numberInt: string;
  numberOut: string;
  phone: string;
  socialNetworkId: string;
  state: string;
  status: string;
  street: string;
  zipCode: string;
  updatedAt: string;
  createdAt: string;
}

export interface Idocuments {
  clientId: number;
}

export interface INewClient {
  name: string;
  lastName: string;
  motherLastName: string;
  phone: string;
  email: string;
  socialNetworkId: string;
  linkSocialNetwork: string;
  street: string;
  numberInt: string;
  numberOut: string;
  colony: string;
  zipCode: string;
  city: string;
  municipality: string;
  state: string;
  avatarUrl: string | File;
  docIneFront: string | File;
  docIneReverse: string | File;
}
