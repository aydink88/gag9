const faker = require('faker');

exports.seed = function (knex) {
  const categories = [
    'Meme',
    'Funny',
    'NSFW',
    'WTF',
    'Random',
    'Anime&Manga',
    'Animals',
    'Gaming',
    'Politics',
  ];
  const posts = [];
  for (let i = 0; i < 200; i++) {
    const post = {
      category: categories[Math.floor(Math.random() * categories.length)],
      image: faker.image.imageUrl(600, 600, 'meme', true),
      title: faker.lorem.sentence(),
      upvotes: 0,
      downvotes: 0,
      userId: Math.floor(Math.random() * 107 + 8),
    };
    posts.push(post);
  }
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert(posts);
    });
};
