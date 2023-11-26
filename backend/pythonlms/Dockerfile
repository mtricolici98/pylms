FROM python:3.11

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY pyproject.toml poetry.lock /

# Install dependencies.
RUN pip install poetry
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Set work directory.
RUN mkdir /app
WORKDIR /app

COPY entrypoint.sh /

# Copy project code.
COPY . /app/


RUN chmod +x "/entrypoint.sh"

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["poetry", "run", "gunicorn", "-b", "0.0.0.0:8000", "pythonlms.wsgi:application"]
