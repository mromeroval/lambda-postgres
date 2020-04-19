'use strict';
const db = require('./db_connect');

module.exports.getUsers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const query = 'SELECT * from public.users';

  db
  .connect()
  .then(client => {
    return client
      .query(query)
      .then(res => {
        client.release()
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.rows)
        })
      })
      .catch(e => {
        client.release()
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: Could not find Users: ' + e
        })
      })
  })

};

module.exports.getUser = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const query = {
    text: 'SELECT * from public.users JOIN public.loans ON public.users.id = public.loans.user_id WHERE public.users.id = $1',
    values: [event.pathParameters.id],
  }

  db
  .connect()
  .then(client => {
    return client
      .query(query)
      .then(res => {
        client.release()
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.rows)
        })
      })
      .catch(e => {
        client.release()
        console.log(e);
        callback(null, {
          statusCode: e.statusCode || 500,
          body: 'Error: Could not find Users: ' + e
        })
      })
  })
};
