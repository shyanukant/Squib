# Squib - A tweet application using Django, Pure Javascript / React and Bootstrap


- Site Map
```
1.  Tweets
        -> User Permissions
            -> Creating
                -> Text
                -> Image -> Media Storage Server
            -> Deleting
            -> Retweeting
                -> Read only serializer
                -> Create only serializer
            -> Liking

2.  Users
        -> Register
        -> Login
```

## Django Setup(backend)
```bash
cd squib/squib
```

Install all dependencies
```bash
pip install -r requirements.txt
```

Add all database table
```bash
python manage.py makemigrations && python manage.py migrate 
```

Create Super User
```bash
python manage.py createsuperuser --username <your_admin_name> --email <email@example.com>
```

Run server
```bash
python manage.py runserver
```

## React Setup(frontend)
Frontend Repo - [checkout](https://github.com/shyanukant/squib-web)
```bash
cd squib-web
```

Install react dependencies
```bash
npm install
```
Run server
```bash
run start
```
