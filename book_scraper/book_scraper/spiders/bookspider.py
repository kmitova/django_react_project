import json

import scrapy
from requests_html import HTMLSession


class BookspiderSpider(scrapy.Spider):
    name = "bookspider"
    allowed_domains = ["https://knigomania.bg"]
    start_urls = ["https://knigomania.bg/izdanija-na-anglijski-ezik.html"]

    def parse(self, response):
        for item in response.json()['data']['components']:
            print(item)
            if not item['name']=='PRODUCT_CAROUSEL':continue
            for container in item['parameters']:
                cat_name = container['title']
                for product in container['products']:
                    yield {"category":cat_name,"product name":product['name']}


session = HTMLSession()
full = []
data = {
        'books': [

        ]
    }

for i in range(1, 6):
    r = session.get(f"https://knigomania.bg/izdanija-na-anglijski-ezik.html?p={i}")
    page_html = r.html
    element = page_html.find('.product-item-details')
    for el in element:
        lst = el.text.split('\n')
        title = lst[0].lower().title()
        author = lst[1].lower().title()
        data['books'].append({
            'title': title,
            'author': author
        })

with open('books.json', 'w') as file:
    json.dump(data, file, indent=4)




