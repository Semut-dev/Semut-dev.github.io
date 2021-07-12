# Kelompok 4
# --------------------------------------------------------------
# Anggota Kelompok:
# 201524001 - Anna Kurniaty
# 201524011 - Ihsan Fauzan Hanif
# 201524012 - Khansa Rafifah Taqiyyah
# 201524020 - Nabiilah Nada Iswari
# 201524025 - Rijal Azmi Oktora Rahmatika Setiabudi
# --------------------------------------------------------------
# @author Kelompok 4
# 
# merge.py
# file python yang berfungsi untuk menggabungkan json hasil
# scraping dan labeling.

import json

with open('data.json') as json_scraping:
    data = json.load(json_scraping)

with open('result.json') as json_labeling:
    labels = json.load(json_labeling)

for datax in data['videos']:
    datax['anotasi'] = []

i = 1
for label in labels:
    choices = label['completions'][0]['result'][0]['value']['choices'][0]
    data_img = label['data']['image']
    img_link = data_img.split('-')[1]
    id = int(img_link.split('.')[0].split('_')[0])
    img_link = "img/anotasi/" + img_link
    video = data['videos'][id - 1]

    video['anotasi'].append({
        "img": img_link,
        "value": choices
    })
    print(i, "V:", id, "(", img_link,")")
    i = i + 1

result = open('data.json', 'w')
json.dump(data, result, indent=4)
result.close()