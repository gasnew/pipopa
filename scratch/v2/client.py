import requests

# Log in
s = requests.session()
url = 'http://192.168.0.146:8080'
credentials = {
  'username': 'garrett',
  'password': 'garrett',
}
r1 = s.post('{}/login'.format(url), credentials)
print(r1.status_code)
print(r1.text)
print('Logged in!')

# Create message
message = {
  'recipient': 'jesse',
}
r2 = s.post('{}/messages/new'.format(url), message)
print('Message created?')
print(r2.status_code)
print(r2.text)

# Upload audio
mid = r2.json()['id']
with open('output.wav', 'rb') as f:
  r3 = s.post('{}/messages/upload/{}'.format(url, mid), data=f)

print(r3.status_code)
print('POSTED!!!')
