FROM python:3.9
WORKDIR /code
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
ENV PATH="/root/.poetry/bin:$PATH"
RUN poetry config virtualenvs.create false
COPY pyproject.toml /code/
COPY poetry.lock /code/
RUN poetry install