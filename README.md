# A template backend api server(with sso)

A backend api server template(with sso) build with nodejs, express and connected with postgresql(with sequelize). For the sso setup, the user model is predefined.

## Prepare
Open a terminal(in vscode), and run

```sh
git clone https://github.com/ChiaYiLong0921/nodejs-backend-template.git
# change your project name
mv nodejs-backend-template your_project_name
cd your_project_name
# check and switch remote url
git remote -v
git remote set-url origin <your new github repo url>
# After your development
git add .
git commit -m"Your message"
git push -u origin main
```

### DB connection setup

- .env

Review `./db/connect.js`, setup the database connection env variables:

```js
const user = process.env.POSTG_USER;
const host = process.env.POSTG_HOST;
...
```

To have the database setup succesfully, setup the following variables in .env:

- POSTG_USER
- POSTG_HOST
- IDEN_DB
- POSTG_PORT
- POSTG_PASSWORD

for the details setting up the database, review the [official documentation](https://www.postgresql.org/docs/)

### User password hashing bcrypt salt

In the `./models/User.js`, the password is hashed with bcrypt, for security purpose, the salt is set in .env, so add the variable in .env file too:

- BCRYPT_SALT_ROUNDS

## Run

In terminal, run

```js
npm install
npm start // with nodemon
// or
node app.js // for one time
```

## Check the result

In your terminal, you should see the following message if everything is working:

```
Connected to IDEN_DB successful.
IDEN_DB sync successfully
Server is listening on port 8080...
```

```python
if (message as expected):
    good to go and proceed to your own api server development
else:
    check the error message patiently
    solve it with google or visit the related documentation or something else
    it should not be hard.
```