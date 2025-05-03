// // userService.ts (this is just an example)
// import { User, CreateUserDto } from '../models/user';
// import { apiRequest } from '../utils/apiClient';
// import { wrapPayload } from '../utils/apiAdapters';

// const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// const USERS_URL = `${BASE_API_URL}/users`;

// export const postUser = async (user: CreateUserDto): Promise<User> => {
//   return apiRequest<User>(USERS_URL, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(wrapPayload('user', user)),
//   });
// };

// // And similarly for GET, PUT, DELETE...
