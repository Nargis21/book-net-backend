# DIGITAL-COW-HAT-BACKEND

## [Live API Link](https://digital-cow-hat-backend.vercel.app/)

## Application Routes

### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/648e8e6ed4dcce11e02ca71a (Single GET)
- api/v1/users/648e8e6ed4dcce11e02ca71a (PATCH)
- api/v1/users/648e8e6ed4dcce11e02ca71a (DELETE)

### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/648e97494dcfb4784fde2c88 (Single GET)
- api/v1/cows/648e97494dcfb4784fde2c88 (PATCH)
- api/v1/cows/648e97494dcfb4784fde2c88 (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=5
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=50000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
