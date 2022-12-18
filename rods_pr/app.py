import csv
from flask import Flask, render_template, redirect


app = Flask(__name__)


class UserText():
    def __init__(self, id_text, text, emotion):
        self.id_text = id_text
        self.text = text
        self.emotion = emotion


@app.route('/')
def index():
    with open('qest.csv', newline='', mode='r', encoding='utf-8') as csvfile:
        file = next(csv.DictReader(csvfile))
        id_text = int(file['id'])
        text = file['text']
        emotion = file['emotion']
        usrtxt = UserText(id_text=id_text, text=text, emotion=emotion)
    return render_template('index.html', usrtxt=usrtxt)


@app.route('/next/<int:id_text>', methods=['GET'])
def next_page(id_text):
    with open('qest.csv', newline='', mode='r', encoding='utf-8') as csvfile:
        file = csv.DictReader(csvfile)
        for row in file:
            if int(row['id']) == id_text:
                usrtxt = UserText(id_text=id_text, text=row['text'], emotion=row['emotion'])
                return render_template('nextpage.html', usrtxt=usrtxt)
        else:
            return redirect('/')


if __name__ == '__main__':
    app.run(debug=False)
