const { User } = require('../models');

const userdata = [
  {
    username: 'way1',
    email: 'way1@gmail.com',
    password: 'password123'
  },
  {
    username: 'way2',
    email: 'way2@yahoo.com',
    password: 'password123'
  },
  {
    username: 'way3',
    email: 'way3@gmail.com',
    password: 'password123'
  },
  {
    username: 'way4',
    email: 'way4@hotmail.com',
    password: 'password123'
  },
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;