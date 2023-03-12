apt-get update
apt-get install nodejs (if its not installed yet)
apt-get install npm -y 
npm i pm2 -g (procces manager like screen)
pm2 start proxy1.js --max-memory-restart 1024M (1024 Mbites of ram used from that script restart the script as fail prevention or Data leaking)
