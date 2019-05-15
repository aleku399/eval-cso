FROM node:10-alpine

# Copy package.json only to temp folder, install its dependencies,
# set workdir and copy the dependnecies there
RUN mkdir /src
# This way, dependnecies are cached without the need of cacheing all files.
COPY package.json /tmp/
RUN cd /tmp && npm install --silent
RUN cp -a /tmp/node_modules /src/

COPY [".", "/src"]
WORKDIR /src

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
