
function login(username, password) {
// Aircast login API host
var host = "",
username = document.getElementById("username").value;
password = document.getElementById("password").value;

// I was told someone was not the biggest fan of XML requests so I left the rest of this function up to you to setup

/*Notes: To make your setup a little faster/easier :D

 1.) HTTP Request
 You had suggested you were not the biggest fan of XML requests so I left this up to you to decide the best way to setup the request

 2.) In order for background.js to access the data from the options menu you need to store it in local Chrome storage

    EXAMPLE USE ON OPTIONS.JS
    chrome.storage.sync.set({'username': 'foo', 'password': 'bar'}, function() {
      console.log('Settings saved');
    });

    EXAMPLE USE ON BACKGROUND.JS
    chrome.storage.sync.get(['username', 'password'], function(items) {
      console.log("username && password", items)
    });

 3.) Possibly helpful Error HTML message:

  On error create a div like this: 

 <div style="color: red; text-align: center; padding: 20px 0px 0px 0px; font-weight: bold;">*Error Message*</div>

 Right after my <button> tag (id="submitLogin")

  */
}

$( document ).ready(function() {
$( "#submitLogin").click(function() {
	login();
});

// Used for submitting after tab press on password
$("#password").keypress(function(e) {
    if(e.which == 13) {
    login();
    }
});

})