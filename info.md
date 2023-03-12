Forward All incoming TCP data from a proxy server to a cnc / C2 Backned Server
You can use multiple front proxies for load balancing. (OVH 100UP AEZA GOOGLE)

In the next version the proxy.js will be able to contact the OVH VAC API to do the Pack Droping

Educational Enterprise Not for Feds Solution






apt-get update
apt-get install nodejs (if its not installed yet)
apt-get install npm -y 
npm i pm2 -g (procces manager like screen)
pm2 start proxy1.js --max-memory-restart 1024M (1024 Mbites of ram used from that script restart the script as fail prevention or Data leaking)
