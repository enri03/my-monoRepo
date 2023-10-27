# Monster App

Welcome to the Monster App! This application allows you to manage and interact with a collection of monsters. You can set up this application in two different ways: locally or using Docker.

## Local Setup

To run this application locally, follow these steps:

1. **Clone the Repository:** 
   - Clone the repository to your local machine.

2. **Install Dependencies:** 
   - In the root directory of the repository, run the following command to install all the required packages and dependencies:
     ```
     npm install
     ```

3. **Set Up MongoDB Cloud Connection:**
   - Since this application uses data from MongoDB Cloud, you'll need an account on MongoDB Cloud.
   - Create a .env file inside the `/packages/backend/` directory.
   - In the .env file, define the following variable:
     ```
     MONGO_URI='mongodb+srv://<username>:<password>@<username>.oiq8x.mongodb.net/monster?retryWrites=true&w=majority'
     ```
     - For information on how to obtain this link, you can refer to this [MongoDB Atlas documentation](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/?tck=docs_chatbot&_ga=2.184733545.174552253.1698398895-440736780.1697793534).

4. **Start the Application:** 
   - Once you've set up your local environment file, go back to the root level of the repository and start the application by running:
     ```
     npm start
     ```

You should now be able to access the front-end at [http://localhost:3000/](http://localhost:3000/) and the back-end at [http://localhost:5000/](http://localhost:5000/).

## Docker Setup

If you prefer to use Docker to set up the application, follow these steps:

1. **Clone the Repository:**
   - Clone the repository to your local machine.

2. **Set Up MongoDB Cloud Connection:**
   - Just like in the local setup, you'll need an account on MongoDB Cloud.
   - Create a .env file inside the `/packages/backend/` directory.
   - In the .env file, define the following variable:
     ```
     MONGO_URI='mongodb+srv://<username>:<password>@<username>.oiq8x.mongodb.net/monster?retryWrites=true&w=majority'
     ```
     - For information on how to obtain this link, you can refer to this [MongoDB Atlas documentation](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/?tck=docs_chatbot&_ga=2.184733545.174552253.1698398895-440736780.1697793534).

3. **Start the Application with Docker:**
   - At the root level of the repository, run the following command to build and start the application using Docker Compose:
     ```
     docker-compose up
     ```

Once the Docker containers finish building, you should be able to access the application at [http://localhost:3000/](http://localhost:3000/).

That's it! You've successfully set up the Monster App, either locally or using Docker. Enjoy managing your monsters!
