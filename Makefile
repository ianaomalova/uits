DEFAULT_GOAL := run-local

BACKEND_ROUTE := backend
VENV = $(BACKEND_ROUTE)/.venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip

FRONTEND_ROUTE := frontend

MANAGE_FILE = $(PYTHON) $(BACKEND_ROUTE)/manage.py

.PHONY: init-project migrate run-local-backend create-admin run-local-frontend

# Подправить потом
.init-project:
	pip3.10 install virtualenv
	cd ${BACKEND_ROUTE} && python3.10 -m virtualenv venv
	./${VENV}/pip install -r requirements.txt
	cd ${FRONTEND_ROUTE} && npm ci --legacy-peer-deps

init-project: .init-project

# Миграция в базу на локалхосте по кредсам из db.local.env
.migrate:
	${MANAGE_FILE} makemigrations
	$(MANAGE_FILE) migrate

migrate: .migrate

# Запуск на локалке бэка напрямую
.run-local-backend:
	$(MANAGE_FILE) runserver

run-local-backend: .run-local-backend

# Запуск на локалке фронта напрямую
.run-local-frontend:
	cd ${FRONTEND_ROUTE} && npm ci --legacy-peer-deps
	cd ${FRONTEND_ROUTE} && npm run start

run-local-frontend: .run-local-frontend



# Создание суперпользователя
.create-admin:
	${MANAGE_FILE} createsuperuser

create-admin: .create-admin