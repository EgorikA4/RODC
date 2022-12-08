from flask import Flask, render_template, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class UserText(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    num_text = db.Column(db.Integer(), nullable=False)
    text = db.Column(db.Text, nullable=False)
    emotion = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return '<UserText %r>' % self.id


@app.route('/')
def index():
    usrtxt = UserText.query.all()
    return render_template('index.html', usrtxt=usrtxt)


@app.route('/next/<int:id_text>', methods=['GET'])
def next_page(id_text):
    usrtxt = UserText.query.get(id_text)
    if usrtxt:
        return render_template('nextpage.html', usrtxt=usrtxt)
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
