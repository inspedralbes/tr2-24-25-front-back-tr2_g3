// import apiService from './ServiceApi';

// export const login = (email, password) => {
//   return apiService.post('/auth/login', { email, password });
// };

// export const register = (username, email, password) => {
//   return apiService.post('/auth/register', { username, email, password });
// };
//PRUEBA SIN SERVIDOR 
export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((user) => user.email === email && user.password === password);
      
      if (user) {
        resolve({ token: 'mock-token' });
      } else {
        reject(new Error('Credenciales incorrectas'));
      }
    }, 1000); 
  });
};


export const register = async (username, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find((user) => user.email === email);
      
      if (existingUser) {
        reject(new Error('El correo ya está registrado'));
      } else {
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        resolve({ message: 'Usuario registrado exitosamente' });
      }
    }, 1000); // Simula un retardo del servidor
  });
};
