import aranet4


class Sensor:
    # 06733
    def __init__(self, mac="E7:DE:06:8B:E4:AD"):
        self.device_mac = mac
        self.ar4 = aranet4.Aranet4(mac)

    def co2(self):
        return self.__current()['co2']

    def __current(self):
        try:
            return self.ar4.currentReadings()
        except Exception as ex:
            print(ex)
            self.ar4 = aranet4.Aranet4(self.device_mac)
            return self.ar4.currentReadings()