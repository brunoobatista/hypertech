const express = require('express');
const app = express();

// app.use(express.static(__dirname+'/dist/angular-admin-lte-demo'));

// app.get('/*', function(req, res) {
//     res.sendFile(__dirname+'/dist/angular-admin-lte-demo/index.html')
// })
app.use(express.static(__dirname+'/src'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname+'/src/index.html')
})

app.listen(process.env.PORT || 4200);