import random


class HumanDetection:

    def __init__(self):
        self.amount_people = 0
        pass

    def people(self):
        self.amount_people = random.randint(0, 3)
        return self.amount_people
