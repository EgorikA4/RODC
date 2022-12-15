import csv

with open('qest.csv', newline='', mode='r', encoding='utf-8') as csvfile:
    file = next(csv.DictReader(csvfile))
    id = file['id']
    text = file['text']
    emotion = file['emotion']
