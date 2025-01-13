// test.js
import { exec } from 'child_process';

// Definir los datos que deseas pasar al script
const data = [
  {
    "_id": "6784cb33264d16a7864348d5",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 6
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 143,
        "correct_answers": 56
      },
      "subtraction": {
        "total_attempts": 287,
        "correct_answers": 134
      },
      "multiplication": {
        "total_attempts": 178,
        "correct_answers": 3
      },
      "division": {
        "total_attempts": 12,
        "correct_answers": 9
      }
    },
    "type": "user",
    "user_id": 37
  },
  {
    "_id": "6784cb33264d16a7864348d6",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 7
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 106,
        "correct_answers": 66
      },
      "subtraction": {
        "total_attempts": 25,
        "correct_answers": 17
      },
      "multiplication": {
        "total_attempts": 127,
        "correct_answers": 27
      },
      "division": {
        "total_attempts": 51,
        "correct_answers": 9
      }
    },
    "type": "user",
    "user_id": 37
  },
  {
    "_id": "6784cb33264d16a7864348d7",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 8
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 143,
        "correct_answers": 133
      },
      "subtraction": {
        "total_attempts": 155,
        "correct_answers": 142
      },
      "multiplication": {
        "total_attempts": 189,
        "correct_answers": 23
      },
      "division": {
        "total_attempts": 297,
        "correct_answers": 253
      }
    },
    "type": "user",
    "user_id": 37
  },
  {
    "_id": "6784cb33264d16a7864348d8",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 9
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 183,
        "correct_answers": 63
      },
      "subtraction": {
        "total_attempts": 172,
        "correct_answers": 121
      },
      "multiplication": {
        "total_attempts": 99,
        "correct_answers": 29
      },
      "division": {
        "total_attempts": 21,
        "correct_answers": 0
      }
    },
    "type": "user",
    "user_id": 37
  },
  {
    "_id": "6784cb33264d16a7864348d9",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 10
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 228,
        "correct_answers": 95
      },
      "subtraction": {
        "total_attempts": 78,
        "correct_answers": 5
      },
      "multiplication": {
        "total_attempts": 170,
        "correct_answers": 113
      },
      "division": {
        "total_attempts": 171,
        "correct_answers": 97
      }
    },
    "type": "user",
    "user_id": 37
  },
  {
    "_id": "6784cb33264d16a7864348da",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 11
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 167,
        "correct_answers": 36
      },
      "subtraction": {
        "total_attempts": 122,
        "correct_answers": 6
      },
      "multiplication": {
        "total_attempts": 260,
        "correct_answers": 82
      },
      "division": {
        "total_attempts": 112,
        "correct_answers": 99
      }
    },
    "type": "user",
    "user_id": 37
  },
  {
    "_id": "6784cb33264d16a7864348db",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 12
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 95,
        "correct_answers": 39
      },
      "subtraction": {
        "total_attempts": 277,
        "correct_answers": 51
      },
      "multiplication": {
        "total_attempts": 40,
        "correct_answers": 8
      },
      "division": {
        "total_attempts": 217,
        "correct_answers": 34
      }
    },
    "type": "user",
    "user_id": 37
  }
];

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
