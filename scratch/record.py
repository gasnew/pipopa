from sys import byteorder
from array import array
from struct import pack

import pyaudio
import wave

THRESHOLD = 500
CHUNK_SIZE = 1024
FORMAT = pyaudio.paInt16
RATE = 44100

def is_silent(snd_data):
  "Returns 'True' if below the 'silent' threshold"
  return max(snd_data) < THRESHOLD

def normalize(snd_data):
  "Average the volume out"
  MAXIMUM = 16384
  times = float(MAXIMUM)/max(abs(i) for i in snd_data)

  r = array('h')
  for i in snd_data:
    r.append(int(i*times))
  return r

def trim(snd_data):
  "Trim the blank spots at the start and end"
  def _trim(snd_data):
    snd_started = False
    r = array('h')

    for i in snd_data:
      if not snd_started and abs(i)>THRESHOLD:
        snd_started = True
        r.append(i)


