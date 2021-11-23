import time

from MongoStorage import Storage
from Sensor import Sensor

from HumanDetection import HumanDetection


class Room:

    def __init__(self):
        self.sensor = Sensor()
        self.storage = Storage()
        self.human_detection = HumanDetection()

    def start(self):
        start_time = time.time()
        while True:
            co2 = self.sensor.co2()
            people = self.human_detection.people()
            self.storage.insert(co2, people)
            time.sleep(60.0 - ((time.time() - start_time) % 60.0))
