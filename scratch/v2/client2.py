import requests

# Log in
s = requests.session()
url = 'http://192.168.0.146:8080'
credentials = {
  'username': 'jesse',
  'password': 'jesse',
}
r1 = s.post('{}/login'.format(url), credentials)
print(r1.status_code)
print(r1.text)
print('Logged in!')

# retrieve waiting messages
r2 = s.get('{}/messages/waiting'.format(url))
print('Messages:')
print(r2.status_code)
print(r2.text)

