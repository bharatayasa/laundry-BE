# Laundry API Routes

This project is an Express.js API that handles various operations for a system including user management, handling orders, processing, and shipping. The API implements role-based access control (RBAC) to secure endpoints based on user roles. Below is a detailed description of the available routes and their functionality.

## Prerequisites

- Node.js and npm installed
- An Express server setup
- Authentication and Authorization middleware configured

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo.git
    cd your-repo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

## API Routes

### General Routes

- **`GET /`**: Health check route that returns a simple server status.

### Authentication Routes

- **`POST /login`**: Login a user and return an access token.
- **`POST /register`**: Register a new user.

### User Management Routes

- **`GET /user`**: Retrieve all users. (Role: `Admin`)
- **`GET /user/:id`**: Retrieve a specific user by ID. (Role: `Admin`)
- **`POST /user`**: Create a new user. (Role: `Admin`)
- **`PUT /user/:id`**: Update user information by ID. (Role: `Admin`)
- **`DELETE /user/:id`**: Soft delete a user by ID. (Role: `Admin`)
- **`PUT /user/restore/:id`**: Restore a soft-deleted user by ID. (Role: `Admin`)

### Report Management

- **`GET /laporan`**: Retrieve all reports. (Role: `Admin`)

### Customer Management

- **`GET /pelanggan`**: Retrieve all customers. (Role: `Kasir`)
- **`GET /pelanggan/:id`**: Retrieve a specific customer by ID. (Role: `Kasir`)
- **`POST /pelanggan`**: Create a new customer. (Role: `Kasir`)
- **`PUT /pelanggan/edit/:id`**: Edit customer information by ID. (Role: `Kasir`)
- **`PUT /pelanggan/:id`**: Restore a soft-deleted customer by ID. (Role: `Kasir`)
- **`DELETE /pelanggan/:id`**: Soft delete a customer by ID. (Role: `Kasir`)

### Order Management

- **`GET /pendaftaran`**: Retrieve all orders. (Role: `Kasir`)
- **`GET /pendaftaran/:id`**: Retrieve a specific order by ID. (Role: `Kasir`)
- **`POST /pendaftaran`**: Create a new order. (Role: `Kasir`)
- **`PUT /pendaftaran/:id`**: Update order information by ID. (Role: `Kasir`)
- **`DELETE /pendaftaran/:id`**: Soft delete an order by ID. (Role: `Kasir`)

### Clothing Management

- **`GET /pakaian`**: Retrieve all clothing items. (Roles: `Kasir`, `Pengolahan`, `Kurir`)
- **`GET /pakaian/:id`**: Retrieve a specific clothing item by ID. (Role: `Kasir`)
- **`POST /pakaian`**: Add a new clothing item. (Role: `Kasir`)
- **`PUT /pakaian/:id`**: Update a clothing item by ID. (Role: `Kasir`)
- **`DELETE /pakaian/:id`**: Soft delete a clothing item by ID. (Role: `Kasir`)

### Payment Management

- **`GET /pembayaran`**: Retrieve all payments. (Role: `Kasir`)
- **`GET /pembayaran/:id`**: Retrieve a specific payment by ID. (Role: `Kasir`)
- **`POST /pembayaran`**: Add a new payment. (Role: `Kasir`)
- **`PUT /pembayaran/:id`**: Update payment information by ID. (Role: `Kasir`)
- **`DELETE /pembayaran/:id`**: Soft delete a payment by ID. (Role: `Kasir`)
- **`GET /pembayaran/download/:id`**: Download invoice for a specific payment. (Role: `Kasir`)

### Processing Management

- **`GET /pengolahan`**: Retrieve all processing records. (Roles: `Pengolahan`, `Kurir`)
- **`GET /pengolahan/:id`**: Retrieve a specific processing record by ID. (Role: `Pengolahan`)
- **`POST /pengolahan`**: Add a new processing record. (Role: `Pengolahan`)
- **`PUT /pengolahan/:id`**: Update processing information by ID. (Role: `Pengolahan`)
- **`DELETE /pengolahan/:id`**: Soft delete a processing record by ID. (Role: `Pengolahan`)

### Shipping Management

- **`GET /pengiriman`**: Retrieve all shipments. (Role: `Kurir`)
- **`GET /pengiriman/:id`**: Retrieve a specific shipment by ID. (Role: `Kurir`)
- **`POST /pengiriman`**: Add a new shipment. (Role: `Kurir`)
- **`PUT /pengiriman/:id`**: Update shipment information by ID. (Role: `Kurir`)
- **`DELETE /pengiriman/:id`**: Soft delete a shipment by ID. (Role: `Kurir`)
- **`GET /kurir/pengirirman`**: Retrieve all shipments for the current courier. (Role: `Kurir`)

## Middleware

- **`AccesToken`**: Middleware to authenticate users based on their JWT token.
- **`checkRole`**: Middleware to authorize users based on their role. Accepts one or more roles as arguments.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
