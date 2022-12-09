import csv

with open('qest.csv', newline='', mode='r', encoding='utf-8') as csvfile:
    file = csv.DictReader(csvfile)
    for row in file:
        id_text = row['id']
        full_text = row['text']
        emotion = row['emotion']
