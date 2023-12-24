from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    entry_price = float(data['entryPrice'])
    invalidation_price = float(data['invalidationPrice'])
    risk = float(data['risk'])
    size = risk / abs(entry_price - invalidation_price)
    return jsonify({'size': size})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
