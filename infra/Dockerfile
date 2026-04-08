FROM python:3.13

WORKDIR /tmp

# Install node and npm via nvm
ENV NODE_VERSION 22.11.0
ENV NVM_DIR /usr/local/nvm
RUN mkdir $NVM_DIR
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN apt update && apt install -y groff jq
RUN npm i -g aws-cdk@v1.122.0 aws-cdk-local
WORKDIR /code/infra
RUN pip install poetry awscli-local[ver1]
RUN poetry config virtualenvs.create false
COPY pyproject.toml /code/infra
COPY poetry.lock /code/infra
RUN poetry install
RUN curl -sSL https://get.docker.com/ | sh