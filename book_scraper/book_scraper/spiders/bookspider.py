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
for i in range(1, 6):
    r = session.get(f"https://knigomania.bg/izdanija-na-anglijski-ezik.html?p={i}")
    page_html = r.html
    el = page_html.find('.product-item-details')
    print(el)

    # r.html.render()
    # lst = r.html.xpath('//h3[@class="product-item-name"]')
    # print(lst)
    # full += lst
json.dump(full, open("links.json","wt"))

