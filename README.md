# App users-crud-back
Simple CRUD for users management
This application allows:

1. List all user
1. Lind a user by it's ID number
1. Lreate a new user
1. Update an existing one
1. Delete one user

## How To Download this version and execute?

Steps (assuming you already have git and yarn):

1. Go to root folder where you want the project it's located and run
```
git clone https://github.com/kliver98/users-crud-back
```
2. Open folder downloaded in desired code editor and run on the terminal:
```
npm install
```
3. Lastly to run the project type on the terminal:
```
npm start
```
Note 1: When run start command, if nothing it's wrong, the console will NOT show information about that loads. You must go to open web browser and access [http://localhost:3000/api/users](http://localhost:3000/api/users) if 3000 port wasn't in use.
Note 2: You must have **_.env.development.local_** file in root project to can load url and connect mongodb. This file will be passed if you collaborate on this project. Otherwise, you can create that file and set a new variable called **MONGODB_URL** and set to your own project on mongodb. Example: 
```
MONGODB_URL = mongodb+srv://user:password@cluster0...
```

## How To Update your fork repository

Run the following commands:

```bash
  git remote add upstream git@github.com:kliver98/users-crud-back.git
  git pull upstream main
```

If you have altered it, you then need to rebase it.

```bash
  git rebase upstream/main
````
