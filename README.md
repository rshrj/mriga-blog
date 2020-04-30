# The Blog

A simple but pretty blog website using MERN stack

## How to run

1. Clone the repo somewhere

```
git clone https://github.com/rshrj/theblog.git
```

2. Create a `config/default.json` file with a single key `mongoURI` and set its value to the URI of your mongoDB database

```
echo "{ 'mongoURI': 'mongodb://blahblah/flahflah' }" >> config/default.json
```

3. Create a Heroku app on the project folder

```
heroku create
```

4. Commit the `config/default.json` file to the repo and push changes to heroku remote repo

```
commit -am 'Added config'
git push heroku master
```

5. Enjoy!
