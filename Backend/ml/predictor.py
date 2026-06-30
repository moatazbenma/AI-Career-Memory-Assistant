import joblib
import pandas as pd

model = joblib.load("ml/model.pkl")
label_encoder = joblib.load("ml/label_encoder.pkl")


def predict_career(data):
    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]

    career = label_encoder.inverse_transform([prediction])[0]

    return career