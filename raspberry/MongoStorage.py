import datetime
import pymongo
import ssl


def json(data):
    if not isinstance(data, list):
        data["_id"] = str(data["_id"])
        return data
    for idx, item in enumerate(data):
        data[idx]['_id'] = str(data[idx]['_id'])
    return data


class Storage:

    def __init__(self):
        self.__con = pymongo.MongoClient(
            "mongodb+srv://CorentinJacob:cituha@cit-cluster.5oxtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
            , authMechanism="SCRAM-SHA-1", ssl=True, ssl_cert_reqs=ssl.CERT_NONE)
        db = self.__con.myFirstDatabase
        self.__cur = db.sensorvalues

    def insert(self, co2, people):
        self.__cur.insert_one({
            "co2": co2,
            "nbrPeoples": people,
            "sensor": "619baffb98d73aaa5806b564",
            "creation_date": datetime.datetime.now(),
        })

    def all(self):
        return json(list(self.__cur.find()))

    def get_only(self, limit):
        return [
            {
                'id': idx + 1,
                'co2': x['co2'],
                'people': x['nbrPeoples'],
                'created_at': x['creation_date']
            }
            for idx, x in enumerate(self.__cur.find(sort=[("_id", -1)], limit=limit))
        ]

    def latest(self):
        return json(self.__cur.find_one(sort=[("_id", -1)]))

    def __del__(self):
        self.__con.close()
