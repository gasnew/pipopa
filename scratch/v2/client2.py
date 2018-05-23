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
mids = [m['id'] for m in r2.json()['messages']]

# download those files
for mid in mids:
  print('message {}'.format(mid))

  filename = '{}.wav'.format(mid)
  r3 = s.get('{}/messages/download/{}'.format(url, mid), stream=True)
  with open(filename, 'wb') as f:
    for chunk in r3.iter_content(chunk_size=512): 
      if chunk: # filter out keep-alive new chunks
        f.write(chunk)
  print(r3.status_code)

print('FILES DOWNLOADED!!')
