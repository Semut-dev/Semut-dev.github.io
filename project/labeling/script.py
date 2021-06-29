import json
import urllib.request
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from datetime import datetime

PATH = "D:\Downloads\Driver\chromedriver_win32\chromedriver.exe"
chrome_option = webdriver.ChromeOptions()
chrome_option.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_option.add_experimental_option('useAutomationExtension', False)
driver = webdriver.Chrome(options = chrome_option, executable_path=PATH)
driver.get("https://www.goodreads.com/list/show/9690.Favorite_Downloads")

bookList = {}
bookList["data"] = []
now = datetime.now()

i = 1
while True:
    for table_row in driver.find_elements_by_xpath("//table[@class='tableList js-dataTooltip']/tbody/tr"):
        table_data = table_row.find_elements_by_tag_name("td")
        img = table_data[1].find_element_by_tag_name("img")
        img_src = img.get_attribute("src")
        title = table_data[2].find_element_by_class_name("bookTitle").text
        author = table_data[2].find_element_by_class_name("authorName").text
        rating = table_data[2].find_element_by_class_name("minirating").text
        score = table_data[2].find_element_by_xpath("//span[@class='smallText uitext']").text
        urllib.request.urlretrieve(img_src, "rawImg/"+ str(i) + ".png")
        bookList["data"].append({
            "judul": title,
            "author": author,
            "rate_avg" : rating.split(' ')[0],
            "rate_total": rating.split(' — ')[1].split(' ')[0],
            "img": img_src,
            "waktu_scraping": now.strftime("%d %B %Y %H:%M:%S")
        })
        print(i,".",title)
        i = i + 1
    try:
        driver.find_element_by_xpath(u'//a[text()="Next →"]').click()
        print("Next page clicked!")
    except NoSuchElementException as e:
        print("No more element")
        break

result = open("data.json", "w")
json.dump(bookList, result, indent = 6)
result.close()
print("Process has been finished")
driver.quit()