var express = require('express');
var app = express();
var http = require('http');
var cors = require('cors');
const path = require('path');

app.use(cors()) ;




app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'admin',
        password: 'NewPassword@18',
        server: '10.62.32.184', 
        database: 'BuildDatabase',
        trustServerCertificate: true
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * FROM [BuildDatabase].[dbo].[vbis_jobqueue_job]', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

app.use(express.static(path.resolve(__dirname, '../job-ststus/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../job-ststus/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

console.log('server started on port:',PORT);
app.listen(PORT);
