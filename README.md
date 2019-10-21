# BackEnd

https://buildweek30before30.herokuapp.com/api

**You must create an instance of axios with `axios.create` and have the `withCredentials` configuration property set to `true`.**

#### Example Setup

```javascript
const api = axios.create({
  baseURL: 'https://buildweek30before30.herokuapp.com/api',
  withCredentials: true,
});

api.post('/auth/register', { username: 'goodusername', password: 'goodpassword' })
  .then(console.log(response.data))
```

## Authentication

| Endpoint        | Method | Notes                                                                                                                                                                                                                                                                                                                                                                                                          |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  /auth/register | POST   | Expects `{ username, password }`. <ul>  <li>`201` if registration was successful. <ul><li>Responds with `{ id }`.</li></ul> </li>  <li>`400` if required information is missing. <ul><li>Responds with `{ message }`.</li></ul>  </li>  <li>`409` if the username is already taken. <ul><li>Responds with `{ message }`.</li></ul> </li>  </ul>                                                                |
| /auth/login     | POST   | In your axios' `post` call, add a 3rd parameter, which is an object that contains an `auth` object. That `auth` object should contain `username` and `password`.  <ul>  <li>`200` if login was successful.</li>  <li>`404` if the user was not found. <ul><li>Responds with `{ message }`.</li></ul> </li>  <li>`401` if the password is incorrect. <ul><li>Responds with `{ message }`.</li></ul>  </li> </ul> |
|                 |        |                                                                                                                                                                                                                                                                                                                                                                                                                |