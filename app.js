//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html");
    //response.send("Running Successfully!");
});
app.post("/", function (request, res) {

    const firstName = request.body.fName;
    const lastName = request.body.lName;
    const Email = request.body.email;


    const data = {
        members: [{
            email_address: Email,
            status: "subscribed",

            
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }

        }

        ]
    };

    const jsonData = JSON.stringify(data);
    //console.log(firstName,lastName,Email);
    const url = "https://us13.api.mailchimp.com/3.0/lists/92afd8440b";
    const options = {
        method: "POST",
        auth: "navjeetpatial:93ba4686a3b4fc27e25115fb77c4d8a8-us13"

    }
    var request = https.request(url, options, function (response) {
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
            //Error: ENOENT: no such file or directory, stat 'C:\Users\Navjeet\desktop\Newsletter-Signupfailure.html'
           // res.send("There was an error with signing up, please try again!");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure",function(request,res){
    
    res.redirect("/");
});

app.listen(process.env.PORT||3000, function () {

    console.log("Server is running on port 3000");
});

// API Key
//93ba4686a3b4fc27e25115fb77c4d8a8-us13

//List Id
//92afd8440b

/*
curl --request GET \
--url 'https://<dc>.api.mailchimp.com/3.0/' \
--user 'anystring:TOKEN
*/