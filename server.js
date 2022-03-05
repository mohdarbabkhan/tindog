const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

mailchimp.setConfig({
  apiKey: "eeaf5104ff5ef9c84a1503632210e592-us14",
  server: "us14",
});

app.post("/", async (req, res) => {
  const cliantemail = req.body.email;
  const response = await mailchimp.lists.addListMember("a33631546c", {
    email_address: cliantemail,
    status: "subscribed",

  });
  if (res.statusCode == 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
});

app.post("/failure", function(req, res) {
  res.redirect("/");
})


app.listen(4000, function() {
  console.log("Server tuned at port 4000");
})
