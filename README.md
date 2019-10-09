# IOT Pedestrian Counter
**Project Developers:**

 - James Schifferle

- Julian Verna

- Paul Wright

- Umar Jafni

- Nova Efata

# Running This App
**Prerequisites:**
 
 - A computer with [Docker](https://www.docker.com/) and [Docker-Compose](https://docs.docker.com/compose/) installed

**Instructions:**
 
 1. Pull this source code to your own machine
 
 2. Navigate to the top level directory, and build the containers with `docker-compose build`
 
 3. If that completed with no errors, run `docker-compose up` to run the app
 
 4. Navigate to [0.0.0.0](0.0.0.0) on port 80 to verify the app is running
 
# The Containers
**/reverseproxy:**

This is the container for the nginX reverse proxy, used to handle and redirect all traffic coming in on port 80. The path is used to determine which container the request should be redirected to

**/frontend:**

This is the NUXT application used to visualise the data in a graphical format. Please visit [Vue.js](https://vuejs.org/) and [NUXT](https://nuxtjs.org/) websites to learn more.

**/api:**

This is the Express server in charge of handling all database operations. This is a RESTful api, that is the only service to communicate with the database.

**/flask:**

This is our data processing server, responsible for handling the data sent from the arduino, classifying the data, and sending a write request to the API server. It is written in python 3, using Flask as the web server. 
