# gl

## Installation
1. [Install NVM](https://github.com/creationix/nvm).
*You may need to restart the terminal or run some special commands to use `nvm` (commands should be provided upon install).*
2. Install Node and NPM
```bash
nvm install node
```
3. Install Node packages. Enter into `/gl` and run.
```bash
npm install
```
4. Install MySQL. You'll need to remember this password to include in your config file later.
```bash
sudo apt-get install mysql-server
```
5. Create database for `gl`.
```sql
create database gl_test;
```
6. Create `config.js`, and edit it.
```bash
cp config/config_template.js config/config.js
```
7. Seed the database.
```bash
node scripts/seed.js
```
8. Start the server.
```bash
node app.js
```
