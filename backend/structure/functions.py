import random


def generateRandomId(start="", end=""):
    return str(start) + str(random.randint(0, 99999999))+str(end)
