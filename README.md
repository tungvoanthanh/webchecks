# WebChecks
## Setup Development server
>npm init

## Add ExpressJS
<a href="https://expressjs.com/">ExpressJS</a>
>npm install express

Create server file that serves static html files

```
[app_webchecks.js]
const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.static('apps/webchecks'));
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
```

## Install Nodemon
<a href="https://nodemon.io/">nodemon</a>
>npm install -g nodemon

## Install UglifyJS
<a href="https://www.npmjs.com/package/uglify-js">UglifyJS</a>
>npm install uglify-js -g

## Checkout "webchecks" repo 
Checkout "webchecks" repo to folder "/apps/webchecks"

## Update package.json script
```
...
  "scripts": {
    ...
    "webchecks": "nodemon app_webchecks.js"
  },
...
```

## Create batch file
```
[start_webchecks.bat]
npm run webchecks
```