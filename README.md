# microservice-demo

A small demo of communication between two microservices.

## Installation and startup
1. Open a terminal and cd to `microservice-demo/api-gateway`
2. Run `npm i` (one time for each folder only)
3. Run `npm run build` (one time for each folder only)
4. Run `npm run start`
5. Open a terminal and cd to `microservice-demo/business-logic` and repeat step 2, 3, and 4.
6. Go to http://localhost:3000/

From here you can increment, decrement, and view the funds of the current user (default Romeo)
Additionally, you can switch user to Juliet

## Running through postman
For this to work only step 5. above is required.
Install the postman collection from `microservice-demo/post`.
Within this lies three folders:

### Romeo
Same functionallity as website, however with posibillity to add funds for Juliet (but not remove or view balance)

### Juliet
Same functionallity as website

### Business Logic
Access the getAvailableFunds endpoint for the buisness logic service directly. This is merely to display the usage of the gateway token.