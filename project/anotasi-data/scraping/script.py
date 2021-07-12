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
# scipt.py
# file python yang berfungsi untuk mengambil info terkait dengan
# video yang terdapat dari satu channel
#
# (hanya untuk testing)

import time
from selenium import webdriver
from pprint import pprint

link = "https://www.youtube.com/watch?v=XT7Oh6vTY1Q"
driver = webdriver.Chrome(executable_path=r'D:\Downloads\Driver\chromedriver_win32\chromedriver.exe')
driver.get(link)
time.sleep(3)
info_all = driver.find_element_by_xpath('/html/body/ytd-app/div/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div').text
info = info_all.split('\n')

videoList = {}
videoList["videos"] = []

pos = 0
duration = info[pos].split(' / ')
pos += 1
trending = 0
trending_category = "none"
if info[pos][0] == '#':
    temp = info[pos].split(" ")[0][1:]
    try:
        int(temp)
        trending = temp
        trending_category = info[pos].split("FOR")[1][1:]
    except ValueError:
        pass
pos += 1
title = info[pos]
pos += 1
views = info[pos].split(" views")[0]
pos += 1
likes = info[pos]
pos += 1
dislikes = info[pos]
pos += 3
channel = info[pos]
pos += 1
subscribers = info[pos].replace(" subscribers", '')


videoList["videos"].append({
    "duration": {
        "start": duration[0],
        "end": duration[1]
    },
    "trending": {
        "rank": trending,
        "category": trending_category
    },
    "title": title,
    "channel": channel,
    "likes": likes,
    "dislikes": dislikes,
    "subscribers": subscribers,
    "views": views
})

pprint(videoList)

driver.close()

# 0:00 / 4:18
# #24 ON TRENDING FOR MUSIC
# WayV-KUN&XIAOJUN '这时烟火 (Back To You)' MV
# 1,866,024 viewsJun 16, 2021
# 444K
# 638
# SHARE
# SAVE
# SMTOWN
# 28M subscribers
# SUBSCRIBE
# WayV-KUN&XIAOJUN's first single "Back To You" is out!
# Listen and download on your favorite platform: https://smarturl.it/KX_BackToYou
# SHOW MORE