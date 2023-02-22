import json
import logging

from etl_pipeline.data.helper_psql import insert_item


def get_book_items(psql_conn):
    with open('data/book_items.json') as json_file:
        data = json.load(json_file)
        for item in data:
            logging.info(f'Processing item: {item["title"]}, {item["author"]}')
            insert_item(psql_conn, item)
