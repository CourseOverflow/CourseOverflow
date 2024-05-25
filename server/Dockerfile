FROM python:3.10-slim

WORKDIR /urs/src/app

COPY requirements.txt /urs/src/app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /urs/src/app/

EXPOSE 8000

CMD ["python", "manage.py", "runserver"]