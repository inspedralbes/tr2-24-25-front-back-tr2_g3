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

names = list(data.keys())
values = list(data.values())

plt.style.use('_mpl-gallery')

# Crear el gráfico
fig, ax = plt.subplots()

ax.plot(names, values)

# Guardar la gráfica con el nombre especificado
plt.savefig(image_name)

print(f"Gráfico guardado como {image_name}")
