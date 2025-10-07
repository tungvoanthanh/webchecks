# sc-plotter
## New Project
>npm init

## Add ExpressJS
>npm install express

Create server file that serves static html files

```
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static('docs'));
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
```

## Install Nodemon
>npm install -g nodemon
or
>npm install --save-dev nodemon

## Install UglifyJS
<a href="https://www.npmjs.com/package/uglify-js">UglifyJS</a>