import matplotlib.pyplot as plt
import sys
import json

try:
    if len(sys.argv) != 3:
        raise ValueError("Por favor, pase un diccionario y un nombre de archivo como argumentos.")

    data = json.loads(sys.argv[1])
    image_name = sys.argv[2]

    dates = [f"{entry['date']['year']}-{entry['date']['month']:02d}-{entry['date']['day']:02d}" for entry in data]
    addition_attempts = [entry['operation_summary']['addition']['total_attempts'] for entry in data]
    addition_correct = [entry['operation_summary']['addition']['correct_answers'] for entry in data]
    subtraction_attempts = [entry['operation_summary']['subtraction']['total_attempts'] for entry in data]
    subtraction_correct = [entry['operation_summary']['subtraction']['correct_answers'] for entry in data]
    multiplication_attempts = [entry['operation_summary']['multiplication']['total_attempts'] for entry in data]
    multiplication_correct = [entry['operation_summary']['multiplication']['correct_answers'] for entry in data]
    division_attempts = [entry['operation_summary']['division']['total_attempts'] for entry in data]
    division_correct = [entry['operation_summary']['division']['correct_answers'] for entry in data]

    plt.figure(figsize=(10, 6))

    plt.plot(dates, addition_attempts, label="Intentos de Suma", marker='o')
    plt.plot(dates, addition_correct, label="Respuestas Correctas de Suma", marker='x')
    plt.plot(dates, subtraction_attempts, label="Intentos de Resta", marker='o')
    plt.plot(dates, subtraction_correct, label="Respuestas Correctas de Resta", marker='x')
    plt.plot(dates, multiplication_attempts, label="Intentos de Multiplicación", marker='o')
    plt.plot(dates, multiplication_correct, label="Respuestas Correctas de Multiplicación", marker='x')
    plt.plot(dates, division_attempts, label="Intentos de División", marker='o')
    plt.plot(dates, division_correct, label="Respuestas Correctas de División", marker='x')

    plt.xlabel('Fecha')
    plt.ylabel('Cantidad')
    plt.title('Intentos y Respuestas Correctas por Operación')
    plt.xticks(rotation=45)
    plt.legend()
    plt.tight_layout()

    plt.savefig(image_name)
    print(f"Gráfico guardado como {image_name}")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
