import requests, json
from bs4 import BeautifulSoup
from datetime import datetime

page = requests.get("https://republika.co.id")
soup = BeautifulSoup(page.content, 'html.parser')
all_data = soup.find_all("div", {"class": "conten1"})

data = []
now = datetime.now()

for each_data in all_data:
    content = each_data.find("div", {"class": "teaser_conten1_center"})
    kategori = content.h1.p.a.text
    judul = content.h2.text
    waktu = content.find("div", {"class": "date"}).text
    
    data.append(({"kategori": kategori, "judul_berita": judul, "waktu_publish": waktu, "waktu_scraping": now.strftime("%d %B %Y %H:%M:%S") }))

with open('data.json', 'w', encoding='utf-8') as fd:
    json.dump(data, fd)