import logging

from etl_pipeline.data.get_data import get_book_items
from etl_pipeline.data.helper_psql import init_logger, psql_connection, psql_connection_test, create_update_table

if __name__ == "__main__":
    init_logger()
    psql_connection_test()
    connection = psql_connection()
    create_update_table(connection)
    get_book_items(connection)

    logging.info("End of program.")
