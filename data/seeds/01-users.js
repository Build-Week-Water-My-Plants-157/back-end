
exports.seed = function(knex) {
  return knex('users').del()
  .then(function () {
      return knex('users').insert([
        {id: 1, username: 'Nico', password: "1234", phone_number: "999-999-9999"},
        {id: 2, username: 'Kyle', password: "1234", phone_number: "999-999-9999"},
        {id: 3, username: 'Sam', password: "1234", phone_number: "999-999-9999"}
      ]);
    });
};
