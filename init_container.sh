#!/bin/sh
set -e

# Get env vars in the Dockerfile to show up in the SSH session
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

echo "Starting SSH ..."
service ssh start
python manage.py collectstatic --noinput

# Start Gunicorn
exec gunicorn squib.wsgi:application --workers=4 --bind 0.0.0.0:8000
