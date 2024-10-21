# UITS Portal

### Локальный запуск Базы данных

```shell
docker-compose up -d
```

После первого запуска нужно создать базу данных "uits"

### Локальный запуск django

Чтобы работали все функции сайта нужно установить значения всем параметрам в db.local.env

```env
POSTGRES_USER - Имя пользователя
POSTGRES_PASSWORD - Пароль от пользователя
POSTGRES_DB - Название Базы Данных
TG_BOT_TOKEN - Токен тг бота для уведомлений
TG_WEBHOOK_HOST - https:// + домен фронта, обязательно со SLASH на конце. Например: https://uits.serje3.ru/
TG_SECRET_TOKEN - произвольная строка букв(латиницы) и цифр. Нужна для авторизации запросов webhook. Держать в секрете. Например: bibaBobaTrololo12321312312
```

```shell
cd ./backend
python -m virtualenv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

Предполагается что все шаги далее выполняются в активированном виртуальном окружении.

Войти в неё можно
либо командой `.\venv\Scripts\activate` на Windows, либо `source ./venv/bin/activate` на Linux

---

### Локальный запуск celery и celery beat

Должен быть запущен также Redis на порту 6379
(он должен был подгрузиться с запуском docker-compose)

```shell
celery -A uits beat -l info
```

```shell
celery -A uits worker -l info --pool=solo
```

---

Для создания superuser:

```shell
python manage.py createsuperuser
```

Вся документация о Django здесь - [docs](https://www.djangoproject.com/)


### Запуск через Makefile

Дабы облегчить процесс подъема локального окружения, был написан очень простенький Makefile, отрабатывающий на MacOS и Linux.

#### Инициализация проекта

Для создания проекта можно использовать цель `init-project`. Она создаст виртуальное окружение для питона, установит зависимости питона и для бэкенда и зависимости JS для фронтенда.

```shell
make init-project
```

#### Запуск бэкенда

```shell
make run-local-backend
```

#### Запуск фронтенда

```shell
make run-local-frontend
```

#### Создание и установление миграций

Инициализирует миграции, если вы совершили изменения в моделях/сделали новые, а затем закатит их в вашу локальную БД.

```shell
make migrate
```

