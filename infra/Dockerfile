FROM nikolaik/python-nodejs:python3.9-nodejs16
RUN npm i -g aws-cdk@v1.122.0 aws-cdk-local
WORKDIR /code
RUN pip install poetry awscli-local[ver1]
RUN poetry config virtualenvs.create false
COPY pyproject.toml /code/
COPY poetry.lock /code/
RUN poetry install