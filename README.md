[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
# Passport-JWT-Auth

This is simple rest api design to learn how passport-jwt works for asymmetric key.




## Run Locally

Clone the project

```bash
  git clone https://github.com/atk81/passport-jwt-auth.git
```

Go to the project directory

```bash
  cd passport-jwt-auth
```

Install dependencies

```bash
  npm install
```

Add a new env file
```bash
  touch .env
  Add content of example.env to it, modify some default values like mongodbURI and secret.
```

Generate new keypair
``` bash
  npm run genKey
```

Start the server

```bash
  npm run start:dev
```


## API Reference

#### Signup a new user

```http
  POST /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `email`  | `string` | **Required**. Your email ID |
| `password` | `string` | **Required**. Your password |


#### Login a new user

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  `email`  | `string` | **Required**. Your email ID |
| `password` | `string` | **Required**. Your password |

Returns a Bearer token sign using JWT asymmetric key.

#### Proteceted Routes

```http
  POST /api/users/welcome
```

**Required** A Bearer token in Header.


## Authors

- [@atk81](https://www.github.com/atk81)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGODB_URI`

`SECRET`

`ENVIRONMENT`


## License

[MIT](https://choosealicense.com/licenses/mit/)

