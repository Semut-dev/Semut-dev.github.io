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
# sort.py
# file python yang berfungsi untuk menyortir data array terkait
# dengan penempatan ekspresi terhadap nomor gambar pada hasil labeling.

import json

with open('data.json') as json_scraping:
    data = json.load(json_scraping)

for datax in data['videos']:
    anotasi = datax['anotasi']
    datax['anotasi'].sort(key = lambda s: int(s['img'].split('/')[2].split('.')[0].split('_')[1]))

result = open('data.json', 'w')
json.dump(data, result, indent=4)
result.close()