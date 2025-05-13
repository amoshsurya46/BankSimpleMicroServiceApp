# Account Service Flask App
# Handles CRUD for bank accounts
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

# Account model (imported from shared in real setup)
class Account(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    account_number = db.Column(db.String(20), unique=True, nullable=False)
    balance = db.Column(db.Float, default=0.0)
    type = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

@app.route('/accounts', methods=['POST'])
def create_account():
    data = request.get_json()
    user_id = data.get('user_id')
    account_number = data.get('account_number')
    acc_type = data.get('type')
    if not user_id or not account_number or not acc_type:
        return jsonify({'error': 'Missing fields'}), 400
    account = Account(user_id=user_id, account_number=account_number, type=acc_type)
    db.session.add(account)
    db.session.commit()
    return jsonify({'message': 'Account created', 'account_id': account.id}), 201

@app.route('/accounts/<int:account_id>', methods=['GET'])
def get_account(account_id):
    account = Account.query.get(account_id)
    if not account:
        return jsonify({'error': 'Account not found'}), 404
    return jsonify({
        'id': account.id,
        'user_id': account.user_id,
        'account_number': account.account_number,
        'balance': account.balance,
        'type': account.type,
        'created_at': account.created_at
    })

@app.route('/accounts/<int:account_id>', methods=['PUT'])
def update_account(account_id):
    account = Account.query.get(account_id)
    if not account:
        return jsonify({'error': 'Account not found'}), 404
    data = request.get_json()
    account.type = data.get('type', account.type)
    db.session.commit()
    return jsonify({'message': 'Account updated'})

@app.route('/accounts/<int:account_id>', methods=['DELETE'])
def delete_account(account_id):
    account = Account.query.get(account_id)
    if not account:
        return jsonify({'error': 'Account not found'}), 404
    db.session.delete(account)
    db.session.commit()
    return jsonify({'message': 'Account deleted'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5002)
