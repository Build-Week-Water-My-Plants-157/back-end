
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {id: 1, nickname: 'Leafy', species: "Super plant", h2o_frequency: "1 week", image: "testurl"},
        {id: 2, nickname: 'Green guy', species: "humtatumta", h2o_frequency: "3 days", image: "testurl"},
        {id: 3, nickname: 'Purpley', species: "dwarf", h2o_frequency: "48 hours", image: "testurl"}
      ]);
    });
};
