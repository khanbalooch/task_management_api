## Requirements
Design a RESTful API for a simple task management system. Users can create tasks, assign them to other users, mark tasks as complete, and categorize tasks.
-  API should have the following endpoints:
    - POST `/task` - Create a new task.
    - GET `/task/:id` - Retrieve a task by its ID.
    - PUT `/task/:id` - Update a specific task.
    - DELETE `/task/:id` - Delete a specific task.
    - GET `/tasks` - Retrieve all tasks.
    - GET `/tasks?assignedTo=[username]` - Retrieve all tasks assigned to a specific user.
    - GET `/tasks?category=[categoryName]` - Retrieve all tasks under a specific category.
	- Implement user authentication. (Bonus Part)
	- Implement pagination for the GET `/tasks` route. (Bonus Part)
- Write unit tests for each of the routes using your choice of testing framework (Mocha, Jest, Jasmine).
- Mock the database or any other external services to ensure tests are isolated.
- Ensure that the API handles errors gracefully and returns user-friendly error messages.
- Share the Postman collection/documentation link.

##Solution

####Assumptions
- Instead of a database, I have used an in-memory data storage mechanism to handle data.
####Technologies Used
- Node@18.18
- TypeScript@5.2.2
- ESLint@8.51.0
- Express@4.18.2
- Jest@29.7.0
####Project Structure
- The API is Desinged in a way that we should be able to scale application.
- The API has Layered architecture which is described below.

- Controller Layer:
The Top layer of application is Controller layer which is responsible for
		 Defining Routes
		 Validating incoming Request
		 If request is valid then entertaining the request
		 Responding back with http status code and message.
- Services Layer:
Services layer is the main layer that just sitting behind the Controller layer. It has the following responsibilites
		 Supports controller layer for its operations
		 Contains the main business logic
		 Interacts with DAO layers to perform any database operations
- Middlewares Layer:
Middlewares actullay behave as a middleman between Incoming request and our API. which perfomrs the following 
		 Act as a middleman between request and business logic
		 Validates if the request is authenticated/valid/meets criteria 
		 If the request is not good throw error that is understandable by ErrorHandlerMiddleware
- ErrorHanlderMiddleware:
It is a middleware that acts after the request. It has following responsibilites
		 Handles the error thrown at any stage of application
		 Responds back with nice message
- Models:
This directory actually contains the classes which represent Real world Models like Task, User etc.
- Application:
Its the main class of application. When Instantiated and started
		Creates Express Server
		Picks the routes and handlers from Controllers
		Picks Middlewares
		Serves the application

#### Configuring Environment files
The application takes some of the parameters from environment files (**.env**) and can changed in different environments. Example is given below
```APP_PORT=3000
APP_PREFIX=/ncle
CONTROLLERS_DIR=D:/work/NCLE/task_management_api/src/api/controllers
MIDDLEWARES_DIR=D:/work/NCLE/task_management_api/src/api/middlewares
```
####Installation
You can install node_modules before starting the application using npm
```bash
npm install
```
#### Running in Local environment
```bash
npm run serve
```
#### Running test cases
```bash
npm run test
```
#### building the application
```bash
npm run build
```
#### Linting
```bash
npm run lint
npm run lint-and-fix
```

###End