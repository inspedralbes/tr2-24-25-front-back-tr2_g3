import matplotlib.pyplot as plt
import sys
import json
import os

try:
    data = json.loads(sys.argv[1])
    image_name = sys.argv[2]

    # Obtener el directorio actual del script
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Obtener el directorio padre (un nivel arriba)
    parent_dir = os.path.dirname(current_dir)

    # Crear el directorio "images/graphs" dentro del directorio padre si no existe
    output_dir = os.path.join(parent_dir, "public_html", "images", "graphs")
    os.makedirs(output_dir, exist_ok=True)

    # Crear la ruta completa para la imagen
    image_path = os.path.join(output_dir, image_name)

    # Crear una lista de fechas en formato "YYYY-MM-DD"
    dates = [f"{entry['date']['year']}-{entry['date']['month']:02d}-{entry['date']['day']:02d}" for entry in data]

    # Calcular los porcentajes para cada operación y almacenarlos en listas
    addition_percentage = [
        round((entry['operation_summary']['addition']['correct_answers'] / entry['operation_summary']['addition']['total_attempts']) * 100, 2) 
        if entry['operation_summary']['addition']['total_attempts'] > 0 else 0
        for entry in data
    ]

    subtraction_percentage = [
        round((entry['operation_summary']['subtraction']['correct_answers'] / entry['operation_summary']['subtraction']['total_attempts']) * 100, 2) 
        if entry['operation_summary']['subtraction']['total_attempts'] > 0 else 0
        for entry in data
    ]

    multiplication_percentage = [
        round((entry['operation_summary']['multiplication']['correct_answers'] / entry['operation_summary']['multiplication']['total_attempts']) * 100, 2) 
        if entry['operation_summary']['multiplication']['total_attempts'] > 0 else 0
        for entry in data
    ]

    division_percentage = [
        round((entry['operation_summary']['division']['correct_answers'] / entry['operation_summary']['division']['total_attempts']) * 100, 2) 
        if entry['operation_summary']['division']['total_attempts'] > 0 else 0
        for entry in data
    ]

    plt.style.use('fivethirtyeight')
    plt.grid(True)

    plt.figure(figsize=(10, 6))

    plt.plot(dates, addition_percentage, label="Suma", marker='o')
    plt.plot(dates, subtraction_percentage, label="Resta", marker='x')
    plt.plot(dates, multiplication_percentage, label="Multiplicació", marker='o')
    plt.plot(dates, division_percentage, label="Divisio", marker='x')

    # Hacer los textos más pequeños
    plt.xlabel('Data', fontsize=16)  # Ajustar el tamaño de la etiqueta del eje X
    plt.ylabel('Percentatge de Respostes Correctes', fontsize=16)  # Ajustar el tamaño de la etiqueta del eje Y
    plt.title('Percentatge de respostes Correctes per operació', fontsize=20)  # Ajustar el tamaño del título

    # Ajustar los límites del eje X para que comience desde la primera fecha
    plt.xlim(dates[0], dates[-1])

    # Ajustar los límites del eje Y para que siempre llegue hasta 100
    plt.ylim(0, 100)

    # Configurar las fechas para que se muestren horizontalmente
    plt.xticks(rotation=70, fontsize=8)  # Ajustar el tamaño de las etiquetas del eje X

    # Reducir el tamaño del texto de la leyenda
    plt.legend(fontsize=8)

    plt.tight_layout()

    plt.savefig(image_path)
    print(f"Gráfico guardado como {image_path}")

except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
