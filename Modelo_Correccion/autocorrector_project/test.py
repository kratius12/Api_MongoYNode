import numpy as np
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Cargar el modelo
model = load_model(r'C:\Users\rortiz\Documents\Modelo_Correccion\autocorrector_project\autocorrector_model.h5')

# Cargar el tokenizador
with open(r'C:\Users\rortiz\Documents\Modelo_Correccion\autocorrector_project\tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def preprocess_text(text):
    sequences = tokenizer.texts_to_sequences([text])
    max_length = 20  # Cambia esto según la longitud máxima que usaste durante el entrenamiento
    padded = pad_sequences(sequences, maxlen=max_length, padding='post')
    return padded

def decode_predictions(predictions):
    predicted_indices = np.argmax(predictions, axis=-1)
    print("Predicted Indices:", predicted_indices)  # Para depurar
    return ' '.join([tokenizer.index_word.get(idx, '') for idx in predicted_indices[0] if idx > 0])

# Prueba con un texto de ejemplo
test_text = "El gato es muy bonit"  # Texto con error
print("Texto original:", test_text)

# Preprocesar el texto
preprocessed_text = preprocess_text(test_text)

# Realizar la predicción
predictions = model.predict(preprocessed_text)
print("Predictions:", predictions)

# Decodificar la predicción
corrected_text = decode_predictions(predictions)
print("Texto correg ido:", corrected_text) ### Análisis de la Nueva Salida


print("Vocabulario del Tokenizador:", tokenizer.word_index)
print("Número de palabras en el vocabulario:", len(tokenizer.word_index))