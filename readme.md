# CREATE configs

# connect to mongodb

# create models / schemas

controller => routes => app.js
app.js => routes => controller(main logic)

# CREATED THREE Schemas

# NEXT STEP : handle requests

1. in routes
   there will be three routes as well as in controller there will also be three controller for each schema

POST /sellers/register: Register a new seller.
POST /sellers/login: Authenticate seller login.
GET /sellers/:id: Fetch seller profile by ID.
PUT /sellers/:id: Update seller information.
DELETE /sellers/:id: Delete seller account. 2. Service Request Routes
POST /services: Create a new service request.
GET /services/:id: Fetch details of a service request by ID.
PUT /services/:id: Update the status of a service request.
DELETE /services/:id: Remove a service request. 3. Reviews Routes
POST /reviews: Submit a review for a completed service.
GET /reviews/:sellerId: Fetch reviews for a specific seller.
DELETE /reviews/:id: Remove a review.
