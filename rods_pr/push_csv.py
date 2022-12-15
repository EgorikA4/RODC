from app import db, UserText
import csv

with open('qest.csv', newline='', mode='r', encoding='utf-8') as csvfile:
    file = csv.DictReader(csvfile)
    num = 1
    for row in file:
        id_text = num
        try:
            id_use = UserText.query.get_or_404(id_text)
            continue
        except:
            full_text = row['text']
            emotion = row['emotion']
            usrtxt = UserText(num_text=id_text, text=full_text, emotion=emotion)
            try:
                db.session.add(usrtxt)
                db.session.commit()
            except:
                print('False')
            num += 1
