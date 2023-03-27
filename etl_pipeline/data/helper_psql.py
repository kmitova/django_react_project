import logging
import environ
import django
import psycopg2
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_react_project.settings')

django.setup()

from api_books.models import Book

env = environ.Env()
environ.Env.read_env()


def init_logger():
    logging.basicConfig(filename='log.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info('Start of program and logger.')


def psql_connection_test():
    connection = None
    try:
        logging.info('Connecting to postgresql database...')
        connection = psycopg2.connect(host='localhost',
                                      database=env('DATABASE_NAME'),
                                      user=env('DATABASE_USER'),
                                      password=env('DATABASE_PASSWORD'))
        cursor = connection.cursor()
        logging.info('postgresql database version:')
        cursor.execute('SELECT version()')

        db_version = cursor.fetchone()
        logging.info(db_version)
        cursor.close()

    except (Exception, psycopg2.DatabaseError) as error:
        logging.error(error)
    finally:
        if connection is not None:
            connection.close()
            logging.info('Database connection closed.')


def psql_connection():
    try:
        logging.info('Connecting to postgresql database...')
        connection = psycopg2.connect(host='127.0.0.1',
                                      database=env('DATABASE_NAME'),
                                      user=env('DATABASE_USER'),
                                      password=env('DATABASE_PASSWORD'))
        return connection
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error(error)


def create_update_table(psql_conn):
    q_create_table = '''
        CREATE TABLE IF NOT EXISTS api_book_books (
        id serial PRIMARY KEY,
        title VARCHAR(90) NOT NULL,
        author VARCHAR(55))
    '''

    try:
        cursor = psql_conn.cursor()
        cursor.execute(q_create_table)
        logging.info(f"Executed query: {q_create_table}")
        cursor.close()
        psql_conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        logging.error(error)


def insert_item(psql_conn, item):
    cursor = None
    q_insert_item = '''
        INSERT INTO api_book_books(title, author)
        VALUES(%s, %s)
    '''

    try:
        cursor = psql_conn.cursor()
        print(item)
        # cursor.execute(q_insert_item, (item['title'], item['author']))
        Book.objects.create(
            title=item['title'],
            author=item['author']
        )

        psql_conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        logging.error(f'Error in insert_item function: {error}')

    finally:
        if cursor is not None:
            cursor.close()
