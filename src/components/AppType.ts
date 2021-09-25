export type UserType = {
  id: string;
  name: string;
  username: string;
  phone: string;
  address: string;
  email: string;
  img: string;

  // first_name: string;
  // last_name: string;
  // birthday: string;
  // id_type: string;
  // id_number: string;
  token: string;
};

export type UserProfileType = {
  id: number;
  name: string;
  username: string;
  phone: string;
  address: string;
  email: string;
  img: string;

  // first_name: string;
  // last_name: string;
  // birthday: string;
  // id_type: string;
  // id_number: string;
  token: string;
};

export type UserProfileUpdateType = {
  // first_name: string;
  // last_name: string;
  phone: string;
  address: string;
  // birthday: string;
};
