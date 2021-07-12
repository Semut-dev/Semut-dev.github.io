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
# thumbnail.py
# file python yang berfungsi untuk mengambil thumbnail pada playlist
# yang terdapat pada YouTube.

from copy import Error
from datetime import datetime
from bs4 import BeautifulSoup as bs
from selenium import webdriver
import json, time

print('[INFO] Running the scrapper ...')
path = 'D:\Downloads\Driver\chromedriver_win32\chromedriver.exe'
playlist_link = 'https://www.youtube.com/playlist?list=PL2HEDIx6Li8h3pCelXYmikYF304TeQhwS'

driver_option = webdriver.ChromeOptions()
driver_option.add_experimental_option('excludeSwitches', ['enable-automation'])
driver_option.add_experimental_option('useAutomationExtension', False)

driver = webdriver.Chrome(options = driver_option, executable_path = path)
driver.get(playlist_link)

time.sleep(10)
driver.execute_script('window.scrollTo(0, 1000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 2000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 3000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 4000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 5000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 6000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 7000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 8000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 9000)')
time.sleep(2)
driver.execute_script('window.scrollTo(0, 10000)')
print('[INFO] Finding the element ...')
soup = bs(driver.page_source, 'html.parser')
res = soup.find_all('div', {'class':'style-scope ytd-playlist-video-renderer', 'id': 'content'})

print('[INFO] Fetching into array ...')

urls = []

count = 0
for data in res:
    url = data.find('a', href=True)
    thumb = ''
    try:
        thumb = data.find('img')['src']
    except KeyError:
        pass

    print(count, thumb)

    videoId = url['href'].split('=')[1]
    if (videoId.endswith('&list')):
        videoId = 'https://www.youtube.com/watch?v=' + videoId[:-5]
    urls.append({
        "id": count,
        "thumbnail_url": thumb
    })
    count += 1

result = open('thumbnail.json', 'w')
json.dump(urls, result, indent=4)
result.close()
driver.close()
print('[INFO] Stored', count, 'videos ...')