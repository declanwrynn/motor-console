import sys, json
import RPi.GPIO as GPIO
from time import sleep

DIR = 10
STEP = 8
CW = 1
CCW = 0

GPIO.setmode(GPIO.BOARD)
sleep(.005)
GPIO.setup(DIR, GPIO.OUT)
sleep(.005)
GPIO.setup(STEP, GPIO.OUT)
sleep(.005)
GPIO.output(DIR, CW)
sleep(.005)

def run_motor(y):
    for x in range(y):
        GPIO.output(STEP, GPIO.HIGH)
        sleep(.005)
        GPIO.output(STEP, GPIO.LOW)
        sleep(.005)

def main():
    for line in sys.stdin:
        op_dict = json.loads(line)
    y = op_dict['length'] * 1000
    run_motor(y)
    GPIO.cleanup()
    op_dict['number'] = op_dict['number'] - 1
    print(json.dumps(op_dict))

if __name__ == "__main__":
    main()
