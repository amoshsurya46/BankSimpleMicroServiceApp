# Transaction Service Flask App
# Handles fund transfers and transaction history
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = SQLAlchemy(app)

# Transaction and Account models (imported from shared in real setup)
class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    account_number = db.Column(db.String(20), unique=True, nullable=False)
    balance = db.Column(db.Float, default=0.0)
    type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    from_account_id = db.Column(db.Integer, nullable=False)
    to_account_id = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    description = db.Column(db.String(255))

@app.route('/transfer', methods=['POST'])
def transfer():
    data = request.get_json()
    from_id = data.get('from_account_id')
    to_id = data.get('to_account_id')
    amount = data.get('amount')
    description = data.get('description', '')
    if not from_id or not to_id or not amount:
        return jsonify({'error': 'Missing fields'}), 400
    from_acc = Account.query.get(from_id)
    to_acc = Account.query.get(to_id)
    if not from_acc or not to_acc:
        return jsonify({'error': 'Account not found'}), 404
    if from_acc.balance < amount:
        return jsonify({'error': 'Insufficient funds'}), 400
    from_acc.balance -= amount
    to_acc.balance += amount
    txn = Transaction(from_account_id=from_id, to_account_id=to_id, amount=amount, description=description)
    db.session.add(txn)
    db.session.commit()
    return jsonify({'message': 'Transfer successful', 'transaction_id': txn.id})

@app.route('/transactions/<int:account_id>', methods=['GET'])
def get_transactions(account_id):
    txns = Transaction.query.filter((Transaction.from_account_id == account_id) | (Transaction.to_account_id == account_id)).all()
    return jsonify([{
        'id': t.id,
        'from_account_id': t.from_account_id,
        'to_account_id': t.to_account_id,
        'amount': t.amount,
        'timestamp': t.timestamp,
        'description': t.description
    } for t in txns])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5003)
