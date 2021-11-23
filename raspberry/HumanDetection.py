import time

import numpy as np
import cv2
import os


class HumanDetection:
    cameraId = 0

    CLASSES = ["person", "aeroplane", "bicycle", "bird", "boat",
               "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
               "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
               "sofa", "train", "tvmonitor"]
    detect = 0
    detectBuffer = []
    mDetect = 0

    def __init__(self):
        path = os.path.dirname(os.path.realpath(__file__))
        self.net = cv2.dnn.readNetFromCaffe(
            path + "/proto.txt", path + "/model.caffemodel")
        self.cap = cv2.VideoCapture(self.cameraId)
        self.enabled = True
        self.amount_people = 0

    def __count_people(self, frame):
        blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)),
                                     0.007843, (300, 300), 127.5)
        detected = 0
        self.net.setInput(blob)
        detections = self.net.forward()
        self.amount_people = 0
        for i in np.arange(0, detections.shape[2]):
            confidence = detections[0, 0, i, 2]
            idx = int(detections[0, 0, i, 1])
            if self.CLASSES[idx] != "person":
                continue
            if confidence > 0.2:
                self.amount_people += 1
        self.detectBuffer.append(detected)
        if len(self.detectBuffer) >= 10:
            self.detect = round(
                sum(self.detectBuffer) / len(self.detectBuffer))
            self.detectBuffer = []

        if self.mDetect != self.detect:
            self.mDetect = self.detect

    def people(self):
        _, frame = self.cap.read()
        self.__count_people(frame)
        return self.amount_people
