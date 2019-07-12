
# use Cypress provided image with all dependencies included
FROM cypress/base:10

# Defines argument which can be passed during build time.
ARG UID
ARG GID

USER root

# Create group that will be used to run the image
RUN groupadd -g $GID docker
# Create user that will be used to run the image
RUN useradd -d /build -m -u $UID -g $GID -s /bin/bash docker

#Run docker locally
#ENV HTTP_PROXY "http://frigo.mediametrie.fr:3128"
#ENV HTTPS_PROXY "http://frigo.mediametrie.fr:3128"
RUN node --version
RUN npm --version
# WORKDIR /home/node/app
# copy our test application
COPY package.json package-lock.json ./
# COPY app ./app
# COPY Cypress tests
COPY cypress.json cypress ./
COPY cypress ./cypress  
COPY run-test.sh /run-test.sh

# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm i
# check if the binary was installed successfully
RUN $(npm bin)/cypress verify
#RUN npm run cypress:ci 
#RUN docker container run -ti -v /cypress/results/:/cypress/results/ bin/bash
ENTRYPOINT ["sh", "/run-test.sh"]