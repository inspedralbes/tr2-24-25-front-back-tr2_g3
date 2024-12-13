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
    "userInfo": {
        "username": "usr",
        "email": "usr@example.com"
    },
    "token": "your.jwt.token",
    "permission": "student"
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

### **Modify permission**
**POST** `/modify-permission`

A route to change permissions for a user (only admin)

#### **Headers:**
```json
{
    "Authorization": "Bearer your.jwt.token"
}
```
#### **Request Body:**
```json
{
    "email": "string",
    "permission_type_id": INT
}
```

#### **Response:**
- **201 OK**:
```json
{
    "message": "Permiso modificado exitosamente"
}
```

- **400 No email or No permission type**:
```json
{
    "message": "Se requieren email y permiso"
}
```

- **401 Unauthorized** (e.g., no token provided):
```json
{
    "message": "Token no proporcionado"
}
```

- **404 User not found**:
```json
{
    "message": "Usuario no encontrado"
}
```

- **500 Error modifying**:
```json
{
    "message": "Error al modificar permiso"
}
```

---

### **Add group**
**POST** `/group`

A route to

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

