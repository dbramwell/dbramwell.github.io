FROM nikolaik/python-nodejs:python3.9-nodejs14
RUN apt update && apt install -y groff jq
RUN npm i -g aws-cdk@v1.122.0 aws-cdk-local
WORKDIR /code/infra
RUN pip install poetry awscli-local[ver1]
RUN poetry config virtualenvs.create false
COPY pyproject.toml /code/infra
COPY poetry.lock /code/infra
RUN poetry install
RUN curl -sSL https://get.docker.com/ | sh