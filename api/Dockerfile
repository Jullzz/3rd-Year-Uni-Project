FROM node:8

# Create app directory
WORKDIR /usr/src/app/


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g jasmine
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
# RUN node node_modules/jasmine/bin/jasmine init
EXPOSE 8000
CMD [ "npm", "start" ]
