# grafica.py
import matplotlib.pyplot as plt
import sys
import json  # Usar json para cargar cadenas JSON

# Verificar que se han pasado los argumentos correctos
if len(sys.argv) != 3:
    print("Por favor, pase un diccionario y un nombre de archivo como argumentos.")
    sys.exit(1)

# Los argumentos estarán como cadenas JSON, por lo que usamos json.loads para convertirlos
data = json.loads(sys.argv[1])
image_name = sys.argv[2]  # El nombre de la imagen

# names will be 0 to data.length
names = list(range(len(data)))


# Inicializar un diccionario para sumar los totales de todas las operaciones
total_summary = {
    "addition": {"total_attempts": 0, "correct_answers": 0, "percentage": 0},
    "subtraction": {"total_attempts": 0, "correct_answers": 0, "percentage": 0},
    "multiplication": {"total_attempts": 0, "correct_answers": 0, "percentage": 0},
    "division": {"total_attempts": 0, "correct_answers": 0, "percentage": 0},
}
# Recorrer cada objeto en el array para sumar los valores de cada operación
for entry in data:
    operation_summary = entry["operation_summary"]
    for operation, values in operation_summary.items():
        total_summary[operation]["total_attempts"] += values["total_attempts"]
        total_summary[operation]["correct_answers"] += values["correct_answers"]
    for operation in total_summary:
        total_summary[operation]["percentage"] = round(
            total_summary[operation]["correct_answers"] * 100 / total_summary[operation]["total_attempts"], 2
        )

print(total_summary)
operations = list(total_summary.keys())
print(operations)


# values = list(data.values())

# plt.style.use('_mpl-gallery')

# # Crear el gráfico
# fig, ax = plt.subplots()

# ax.plot(names, values)

# # Guardar la gráfica con el nombre especificado
# plt.savefig(image_name)

# print(f"Gráfico guardado como {image_name}")
