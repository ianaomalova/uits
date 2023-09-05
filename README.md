# UITS Portal

### Локальный запуск Базы данных
```shell
docker-compose up -d
```
После первого запуска нужно создать базу данных "uits"
### Локальный запуск django

```shell
cd ./backend
python -m virtualenv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Для создания superuser:
```shell
python manage.py createsuperuser
```

Вся документация о Django здесь - [docs](https://www.djangoproject.com/)