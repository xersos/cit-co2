from waitress import serve
from flask import Flask, jsonify
from flask_cors import CORS
import threading

from Prediction import Prediction
from Room import Room
from MongoStorage import Storage

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
cors = CORS(app, origins=['*'])
threading.Thread(target=Room().start, daemon=True).start()


@app.route('/')
def room_details():
    return jsonify(name='room name', size='20m2')


@app.route('/current-values')
def current_value():
    storage = Storage()
    cur = storage.latest()
    return dict(cur)


@app.route('/historical-values')
def all_values():
    storage = Storage()
    return jsonify(storage.all())


@app.route('/trend')
def trend():
    prediction = Prediction()
    return prediction.predict()


if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
