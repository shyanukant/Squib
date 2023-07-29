FROM python:3.10

WORKDIR /app/squib

COPY requirements.txt .

RUN pip install --no-cache-dir virtualenv
RUN virtualenv venv

ENV PATH="/app/venv/bin:$PATH"

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE $PORT

CMD gunicorn squib.wsgi:application --workers=4 --bind 0.0.0.0:$PORT