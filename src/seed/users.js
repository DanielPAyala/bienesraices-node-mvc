import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Carlos',
    email: 'carlos@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    confirmed: true
  }
];

export default users;