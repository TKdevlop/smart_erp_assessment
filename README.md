#### dependencies

1. node
```bash
# setup backend API for development
cd [project]
npm run start:dev # start API by default at port 3000
```
#### example
POST http://localhost:3000/links 
    
BODY  
<pre>
{"url":"https://google.com"} 
</pre> 
expected Response  
<pre>
  {  
    "url": "https://google.com",  
    "urlHash": "URL Search Hash",  
    "shortUrl": "Short URL"   
  }
</pre>
GET http://localhost:3000/[hash]  
(redirects to orignal URL)

```bash
# setup backend API for production
cd [project]
npm run build
cd dist
touch .env # PORT = [PORT at which to run server]
pm2 start main.js || node main.js
```