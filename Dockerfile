# Use the official Python image as the base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Create a virtual environment
RUN python -m venv venv

# Activate the virtual environment and set the script as executable
RUN chmod +x venv/bin/activate && \
    . venv/bin/activate && \
    pip install --no-cache-dir --upgrade pip

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN python manage.py collectstatic --noinput

# Copy the rest of your Django application code
COPY . .

COPY sshd_config /etc/ssh/

# Start and enable SSH
RUN apt-get update \
    && apt-get install -y --no-install-recommends dialog \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd \
    && chmod u+x /app/init_container.sh

EXPOSE 8000 2222

ENTRYPOINT [ "/app/init_container.sh" ] 