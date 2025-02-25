import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
import pickle
import tensorflow_hub as hub

# Cargar el conjunto de datos
data = pd.read_csv(r'C:\Users\rortiz\Documents\Modelo_Correccion\autocorrector_project\dataset.csv')

# Preprocesar los datos
X = data['error'].values
y = data['corrección'].values

# Tokenización
tokenizer = Tokenizer(num_words=10000)
tokenizer.fit_on_texts(X)

# Convertir texto a secuencias
X_sequences = tokenizer.texts_to_sequences(X)
y_sequences = tokenizer.texts_to_sequences(y)

# Padding
max_length = max(max(len(seq) for seq in X_sequences), max(len(seq) for seq in y_sequences))
X_padded = pad_sequences(X_sequences, maxlen=max_length, padding='post')
y_padded = pad_sequences(y_sequences, maxlen=max_length, padding='post')

# Dividir en conjunto de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X_padded, y_padded, test_size=0.2)

# Cargar un modelo preentrenado de TFHub
bert_model = hub.load("https://tfhub.dev/google/experts/bert/wiki_books/1")

# Definir el modelo
def create_model(vocab_size, embedding_dim, hidden_units):
    model = tf.keras.Sequential([
        layers.Input(shape=(max_length,), dtype=tf.int32),
        layers.Embedding(vocab_size, embedding_dim),
        layers.LSTM(hidden_units, return_sequences=True),
        layers.Dense(vocab_size, activation='softmax')
    ])
    return model

# Crear y compilar el modelo
model = create_model(vocab_size=10000, embedding_dim=256, hidden_units=512)
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Reentrenar el modelo
history = model.fit(X_train, np.expand_dims(y_train, -1), epochs=10, batch_size=64, validation_split=0.2)

# Guardar el modelo
model.save('autocorrector_model.h5')

# Guardar el tokenizador
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

print("Modelo y tokenizador guardados con éxito.")