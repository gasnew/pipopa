import requests

# Log in
s = requests.session()
url = 'http://localhost:8080'
credentials = {
  'username': 'thingaling',
  'password': 'thingaling',
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

