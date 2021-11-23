import numpy as np
from MongoStorage import Storage
storage = Storage()


def trend(indexes, data, order=1):
    return int(np.polyfit(indexes, data, order)[-2])


def minutes_left(current, slope):
    diff = 1800 - min(current, 1800)
    if diff == 0 or slope == 0:
        return 0
    return diff / slope


class Prediction:

    def __init__(self):
        self.rows = storage.get_only(10)[::-1]

    def predict(self):
        index = [d['id'] for d in self.rows]
        data_keys = [d['co2'] for d in self.rows]
        cur_trend = trend(index, data_keys)
        result = {"time_left": None, "trend": None}
        if cur_trend < 0:
            result['trend'] = 0
            return result
        minutes = minutes_left(data_keys[-1], cur_trend)
        result['time_left'] = minutes
        result['trend'] = 1
        return result
