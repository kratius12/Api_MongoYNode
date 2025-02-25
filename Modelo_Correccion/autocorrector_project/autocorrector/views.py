import numpy as np
import pickle
from django.shortcuts import render
from .forms import TextInputForm
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Cargar el modelo
model = load_model('autocorrector_model.h5')

# Cargar el tokenizador
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
    print(tokenizer)

def preprocess_text(text):
    # Convertir texto a secuencias
    sequences = tokenizer.texts_to_sequences([text])
    max_length = 20  # Cambia esto según la longitud máxima que usaste durante el entrenamiento
    padded = pad_sequences(sequences, maxlen=max_length, padding='post')
    return padded

def decode_predictions(predictions):
    # Obtener el índice de la palabra con la mayor probabilidad
    predicted_indices = np.argmax(predictions, axis=-1)
    return ' '.join([tokenizer.index_word.get(idx, '') for idx in predicted_indices[0] if idx > 0])

def autocorrect(text):
    preprocessed_text = preprocess_text(text)
    predictions = model.predict(preprocessed_text)
    corrected_text = decode_predictions(predictions)
    return corrected_text

def autocorrect_view(request):
    if request.method == 'POST':
        form = TextInputForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data['text']
            corrected_text = autocorrect(text)
            print("Texto corregido:", corrected_text)  # Para depurar
            return render(request, 'result.html', {'corrected_text': corrected_text})
    else:
        form = TextInputForm()
    return render(request, 'form.html', {'form': form})