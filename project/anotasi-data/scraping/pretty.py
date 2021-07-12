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
# pretty.py
# file python yang berfungsi untuk melakukan cleaning dan formatting
# pada hasil json hasil scraping.

import json, math

pretty = {}
pretty['videos'] = []

def convert(s):
    multipliers = {'K': 10**3, 'M': 10**6, 'B': 10**9}

    if s[-1] in multipliers:
        return math.floor(float(s[:-1]) * multipliers[s[-1]])
    else:
        return math.floor(float(s))


with open('data.json') as json_file:
    data = json.load(json_file)

with open('thumbnail.json') as json_thumbnail:
    thumbnail = json.load(json_thumbnail)


for video in data['videos']:
    index = video['index']
    duration_arr = video['duration'].split(':')
    duration = int(duration_arr[0]) * 60 + int(duration_arr[1])
    rank = int(video['trending']['rank'])
    category = video['trending']['category']
    title = video['title']
    channel = video['channel']
    likes = math.floor(convert(video['likes'].replace(',', '')))
    dislikes = convert(video['dislikes'].replace(',', ''))
    subscribers = convert(video['subscribers'].replace(',', ''))
    views = convert(video['views'].replace(',', ''))
    url = video['url']
    turl = ''
    try:
        turl = thumbnail[index - 1]['thumbnail_url']
    except IndexError:
        print('Error',index)

    pretty['videos'].append({
        'index': index,
        'duration': duration,
        'trending': {
            'rank': rank,
            'category': category
        },
        'title': title,
        'channel': channel,
        'likes': likes,
        'dislikes': dislikes,
        'subscribers': subscribers,
        'views': views,
        'url': url,
        'thumbnail': turl.split('.jpg')[0] + '.jpg'
    })
    print('[INFO]', index, title, 'by',channel)

result = open('data.json', 'w')
json.dump(pretty, result, indent=4)
result.close()