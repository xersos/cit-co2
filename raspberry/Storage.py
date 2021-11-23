import sqlite3


class Storage:

    def __init__(self):
        self.__con = sqlite3.connect('database.sqlite', check_same_thread=False)
        self.__con.row_factory = sqlite3.Row
        self.__create_table()
        self.__cur = self.__con.cursor()

    def insert(self, co2, people):
        self.__cur.execute("INSERT INTO sensor_data (co2, people) VALUES (?, ?)", [co2, people])
        self.__con.commit()

    def all(self):
        result = self.__cur.execute("SELECT * FROM sensor_data").fetchall()
        return [dict(row) for row in result]

    def get_only(self, limit):
        result = self.__cur.execute("SELECT * FROM sensor_data ORDER BY id DESC LIMIT ?", [limit]).fetchall()
        return [dict(row) for row in result]

    def latest(self):
        return self.__cur.execute("SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1").fetchall()

    def __create_table(self):
        self.__con.execute(""" CREATE TABLE IF NOT EXISTS sensor_data (
                                        id integer PRIMARY KEY AUTOINCREMENT,
                                        co2 integer NOT NULL,
                                        people integer NOT NULL,
                                        created_at text DEFAULT CURRENT_TIMESTAMP
                                    );
                                    """)

    def __del__(self):
        self.__con.close()
