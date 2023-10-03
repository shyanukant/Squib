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

# Copy the rest of your Django application code
COPY . .

# Start your Django application as usual
EXPOSE 8000

CMD ["venv/bin/gunicorn", "squib.wsgi:application", "--workers=4", "--bind", "0.0.0.0:8000"]
