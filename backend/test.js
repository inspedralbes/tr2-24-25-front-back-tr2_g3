// test.js
import { exec } from 'child_process';

// Definir los datos que deseas pasar al script
const data = {
  'apple': 10, 'orange': 15, 'lemon': 30, 'lime': 40, 'grape': 30, 'banana': 45, 'kiwi': 60
};

// Nombre del archivo de la imagen
const imageName = 'grafica_personalizada.png';

// Convertir los datos a cadenas JSON
const dataStr = JSON.stringify(data);

// Escapar las comillas dobles en las cadenas JSON para la línea de comandos
const escapedDataStr = dataStr.replace(/"/g, '\\"');
const escapedImageName = imageName.replace(/"/g, '\\"');

// Ejecutar el script de Python pasando los datos y el nombre de la imagen como argumento
exec(`py grafica.py "${escapedDataStr}" "${escapedImageName}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error ejecutando el script: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
