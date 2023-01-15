const bcrypt = require('bcryptjs');
const faker = require('faker');

async function seed(knex) {
  const pw = await bcrypt.hash('123456', 8);
  const users = [
    {
      username: 'admin',
      email: 'admin@example.com',
      password: pw,
      role: 'admin',
    },
    {
      username: 'user',
      email: 'user@example.com',
      password: pw,
      role: 'user',
    },
  ];

  for (let i = 0; i < 100; i++) {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: pw,
      role: 'user',
    };
    users.push(user);
  }

  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
    });
}

module.exports = { seed }