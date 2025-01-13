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
  },
  {
    "_id": "6784cc50b3a6d90c57a1618f",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 6
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 68,
        "correct_answers": 37
      },
      "subtraction": {
        "total_attempts": 97,
        "correct_answers": 84
      },
      "multiplication": {
        "total_attempts": 214,
        "correct_answers": 131
      },
      "division": {
        "total_attempts": 18,
        "correct_answers": 14
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc50b3a6d90c57a16190",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 7
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 235,
        "correct_answers": 209
      },
      "subtraction": {
        "total_attempts": 218,
        "correct_answers": 181
      },
      "multiplication": {
        "total_attempts": 179,
        "correct_answers": 147
      },
      "division": {
        "total_attempts": 267,
        "correct_answers": 124
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc50b3a6d90c57a16191",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 8
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 252,
        "correct_answers": 156
      },
      "subtraction": {
        "total_attempts": 84,
        "correct_answers": 50
      },
      "multiplication": {
        "total_attempts": 10,
        "correct_answers": 3
      },
      "division": {
        "total_attempts": 37,
        "correct_answers": 26
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc50b3a6d90c57a16192",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 9
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 165,
        "correct_answers": 93
      },
      "subtraction": {
        "total_attempts": 287,
        "correct_answers": 106
      },
      "multiplication": {
        "total_attempts": 211,
        "correct_answers": 92
      },
      "division": {
        "total_attempts": 195,
        "correct_answers": 169
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc50b3a6d90c57a16193",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 10
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 202,
        "correct_answers": 141
      },
      "subtraction": {
        "total_attempts": 209,
        "correct_answers": 75
      },
      "multiplication": {
        "total_attempts": 183,
        "correct_answers": 80
      },
      "division": {
        "total_attempts": 223,
        "correct_answers": 140
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc50b3a6d90c57a16194",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 11
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 228,
        "correct_answers": 105
      },
      "subtraction": {
        "total_attempts": 296,
        "correct_answers": 216
      },
      "multiplication": {
        "total_attempts": 68,
        "correct_answers": 7
      },
      "division": {
        "total_attempts": 87,
        "correct_answers": 56
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc50b3a6d90c57a16195",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 12
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 285,
        "correct_answers": 242
      },
      "subtraction": {
        "total_attempts": 54,
        "correct_answers": 18
      },
      "multiplication": {
        "total_attempts": 155,
        "correct_answers": 107
      },
      "division": {
        "total_attempts": 53,
        "correct_answers": 13
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc6c62d7a6c385b69dc1",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 6
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 66,
        "correct_answers": 33
      },
      "subtraction": {
        "total_attempts": 285,
        "correct_answers": 204
      },
      "multiplication": {
        "total_attempts": 114,
        "correct_answers": 67
      },
      "division": {
        "total_attempts": 128,
        "correct_answers": 27
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc6c62d7a6c385b69dc2",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 7
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 155,
        "correct_answers": 36
      },
      "subtraction": {
        "total_attempts": 116,
        "correct_answers": 81
      },
      "multiplication": {
        "total_attempts": 234,
        "correct_answers": 153
      },
      "division": {
        "total_attempts": 146,
        "correct_answers": 137
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc6c62d7a6c385b69dc3",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 8
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 285,
        "correct_answers": 90
      },
      "subtraction": {
        "total_attempts": 272,
        "correct_answers": 187
      },
      "multiplication": {
        "total_attempts": 106,
        "correct_answers": 55
      },
      "division": {
        "total_attempts": 208,
        "correct_answers": 175
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc6c62d7a6c385b69dc4",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 9
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 261,
        "correct_answers": 133
      },
      "subtraction": {
        "total_attempts": 131,
        "correct_answers": 60
      },
      "multiplication": {
        "total_attempts": 215,
        "correct_answers": 133
      },
      "division": {
        "total_attempts": 58,
        "correct_answers": 10
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc6c62d7a6c385b69dc5",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 10
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 264,
        "correct_answers": 32
      },
      "subtraction": {
        "total_attempts": 116,
        "correct_answers": 48
      },
      "multiplication": {
        "total_attempts": 33,
        "correct_answers": 20
      },
      "division": {
        "total_attempts": 298,
        "correct_answers": 153
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc6c62d7a6c385b69dc6",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 11
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 293,
        "correct_answers": 90
      },
      "subtraction": {
        "total_attempts": 275,
        "correct_answers": 186
      },
      "multiplication": {
        "total_attempts": 131,
        "correct_answers": 21
      },
      "division": {
        "total_attempts": 132,
        "correct_answers": 21
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc6c62d7a6c385b69dc7",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 12
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 252,
        "correct_answers": 132
      },
      "subtraction": {
        "total_attempts": 43,
        "correct_answers": 20
      },
      "multiplication": {
        "total_attempts": 241,
        "correct_answers": 149
      },
      "division": {
        "total_attempts": 180,
        "correct_answers": 145
      }
    },
    "type": "user",
    "user_id": 38
  },
  {
    "_id": "6784cc89d5f3714c38d1ee29",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 6
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 266,
        "correct_answers": 99
      },
      "subtraction": {
        "total_attempts": 81,
        "correct_answers": 53
      },
      "multiplication": {
        "total_attempts": 279,
        "correct_answers": 196
      },
      "division": {
        "total_attempts": 262,
        "correct_answers": 12
      }
    },
    "type": "user",
    "user_id": 40
  },
  {
    "_id": "6784cc89d5f3714c38d1ee2a",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 7
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 193,
        "correct_answers": 47
      },
      "subtraction": {
        "total_attempts": 205,
        "correct_answers": 39
      },
      "multiplication": {
        "total_attempts": 2,
        "correct_answers": 1
      },
      "division": {
        "total_attempts": 5,
        "correct_answers": 3
      }
    },
    "type": "user",
    "user_id": 40
  },
  {
    "_id": "6784cc89d5f3714c38d1ee2b",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 8
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 82,
        "correct_answers": 54
      },
      "subtraction": {
        "total_attempts": 40,
        "correct_answers": 35
      },
      "multiplication": {
        "total_attempts": 98,
        "correct_answers": 39
      },
      "division": {
        "total_attempts": 82,
        "correct_answers": 62
      }
    },
    "type": "user",
    "user_id": 40
  },
  {
    "_id": "6784cc89d5f3714c38d1ee2c",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 9
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 276,
        "correct_answers": 174
      },
      "subtraction": {
        "total_attempts": 241,
        "correct_answers": 3
      },
      "multiplication": {
        "total_attempts": 221,
        "correct_answers": 74
      },
      "division": {
        "total_attempts": 8,
        "correct_answers": 7
      }
    },
    "type": "user",
    "user_id": 40
  },
  {
    "_id": "6784cc89d5f3714c38d1ee2d",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 10
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 108,
        "correct_answers": 35
      },
      "subtraction": {
        "total_attempts": 123,
        "correct_answers": 73
      },
      "multiplication": {
        "total_attempts": 237,
        "correct_answers": 62
      },
      "division": {
        "total_attempts": 20,
        "correct_answers": 15
      }
    },
    "type": "user",
    "user_id": 40
  },
  {
    "_id": "6784cc89d5f3714c38d1ee2e",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 11
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 279,
        "correct_answers": 77
      },
      "subtraction": {
        "total_attempts": 194,
        "correct_answers": 10
      },
      "multiplication": {
        "total_attempts": 211,
        "correct_answers": 34
      },
      "division": {
        "total_attempts": 253,
        "correct_answers": 32
      }
    },
    "type": "user",
    "user_id": 40
  },
  {
    "_id": "6784cc89d5f3714c38d1ee2f",
    "date": {
      "year": 2025,
      "month": 1,
      "day": 12
    },
    "operation_summary": {
      "addition": {
        "total_attempts": 177,
        "correct_answers": 107
      },
      "subtraction": {
        "total_attempts": 66,
        "correct_answers": 19
      },
      "multiplication": {
        "total_attempts": 236,
        "correct_answers": 144
      },
      "division": {
        "total_attempts": 88,
        "correct_answers": 86
      }
    },
    "type": "user",
    "user_id": 40
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
