# API Documentation

---

## Authentication Endpoints

### **Register**
**POST** `/auth/register`

Registers a new user.

#### **Request Body:**
```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

#### **Response:**
- **201 Created**:
```json
{
    "message": "Usuario registrado exitosamente"
}
```

- **400 Bad Request** (e.g., email already exists):
```json
{
    "message": "El usuario ya existe"
}
```

---

### **Login**
**POST** `/auth/login`

Authenticates a user and returns a JWT.

#### **Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

#### **Response:**
- **200 OK**:
```json
{
    "message": "Inicio de sesión exitoso",
    "token": "your.jwt.token"
}
```

- **401 Unauthorized** (e.g., incorrect credentials):
```json
{
    "message": "Credenciales incorrectas"
}
```

---

## Protected Endpoints

### **Example Protected Route**
**GET** `/protected`

A route that requires a valid JWT to access.

#### **Headers:**
```json
{
    "Authorization": "Bearer your.jwt.token"
}
```

#### **Response:**
- **200 OK**:
```json
{
    "message": "Bienvenido, {\"id\":1,\"username\":\"david\",\"email\":\"david@example.com\",\"iat\":1678376478,\"exp\":1678380078}"
}
```

- **401 Unauthorized** (e.g., no token provided):
```json
{
    "message": "Token no proporcionado"
}
```

- **403 Forbidden** (e.g., invalid token):
```json
{
    "message": "Token inválido o expirado"
}
```

---

## Error Codes

| Status Code | Description                  |
|-------------|------------------------------|
| 200         | Request succeeded            |
| 201         | Resource created successfully|
| 400         | Bad request                  |
| 401         | Unauthorized                 |
| 403         | Forbidden                    |
| 500         | Internal server error        |

---

### Notes
- Always include the JWT token in the `Authorization` header for protected routes.
- Use a `.env` file to configure the `JWT_SECRET` and database connection details.

