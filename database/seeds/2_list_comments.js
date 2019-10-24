exports.seed = knex => {
  return knex('list_comments').del()
    // .then(() => {
    //   // Inserts seed entries
    //   return knex('list_comments').insert({
    //     list_id: 1,
    //     user_id: 1,
    //     content: 'Comment contents'
    //   });
    // });
};
