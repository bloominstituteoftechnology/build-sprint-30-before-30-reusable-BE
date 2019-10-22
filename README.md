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
  .then(response => console.log(response.data))
```

## Authentication

| Endpoint        | Method | Notes                                                                                                                                                                                                                                                                                                                                                                                                          |
|-----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  /auth/register | POST   | Expects `{ username, password }`. <ul>  <li>`201` if registration was successful. <ul><li>Responds with `{ id }`.</li></ul> </li>  <li>`400` if required information is missing. <ul><li>Responds with `{ message }`.</li></ul>  </li>  <li>`409` if the username is already taken. <ul><li>Responds with `{ message }`.</li></ul> </li>  </ul>                                                                |
| /auth/login     | POST   | In your axios' `post` call, add a 3rd parameter, which is an object that contains an `auth` object. That `auth` object should contain `username` and `password`.  <ul>  <li>`200` if login was successful.</li>  <li>`404` if the user was not found. <ul><li>Responds with `{ message }`.</li></ul> </li>  <li>`401` if the password is incorrect. <ul><li>Responds with `{ message }`.</li></ul>  </li> </ul> |
|                 |        |                                                                                                                                                                                                                                                                                                                                                                                                                |

## Lists

#### Example List

```javascript
{
  "id": 6,
  "user_id": 1,
  "name": "Cool list",
  "description": "Do it before you die",
  "deadline": null,
  "created_by": "test"
}
```

| Endpoint   | Method | Notes                                                                                                                                                                                                                                                                                                                |
|------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /lists     | GET    | <ul>  <li> <code>200</code> with an array of all lists.  </li>  </ul>                                                                                                                                                                                                                                                |
| /lists     | POST   | <ul><li><code>201</code> if creation was successful.<ul><li>Responds with the created list.</ul></ul>                                                                                                                                  |
| /lists/:id | PUT    | <ul>  <li>  <code>200</code> if the list with the specified <code>id</code> was updated. <ul><li>Responds with the updated list.</li></ul>  </li>  <li> <code>404</code> if the list with the specified <code>id</code> could not be found. <ul><li>Responds with <code>{ message } </code>.</li></ul>  </li>  </ul> |
| /lists/:id | GET    | <ul>  <li>  <code>200</code> if the list with the specified <code>id</code> was found. <ul><li>Responds with the list.</li></ul>  </li>  <li> <code>404</code> if the list with the specified <code>id</code> could not be found. <ul><li>Responds with <code>{ message } </code>.</li></ul>  </li>  </ul>           |
| /lists/:id | DELETE | <ul>   <li> <code>404</code> if the list with the specified <code>id</code> could not be found. <ul><li>Responds with <code>{ message } </code>.</li></ul>  </li>  </ul>                                                                                                                                             |