<!Doctype html>
<html>
	<head>
		<link href = "css/mobileStyle.css" media = "screen and (max-device-width: 592px)" rel = "stylesheet" type = "text/css"/>
		<link href = "pwaFiles/manifest.json" rel = "manifest"/>
		<script src = "https://code.jquery.com/jquery-3.3.1.min.js"></script>
	</head>

	<body>
		<div id = "container">
			<div id = "welcomeMessage"><!--This welcome message is shit! Redesign it!-->
				<h1 class = "theArbitrary">Arbitrary</h1><br/>
				<h1>Flash-Card App</h1><br/>
				<span class = "messageAlign">Your Flash-Cards</span><br/>
				<span class = "messageAlign">All In One Place</span>
			</div>
			<form id = "authenticationHandle">
				<div id = "loginSection">
				</div>
				<div id = "signupSection">
				</div>
			</form>
			<div id = "welcomeOptions">
				<button class = "customizeButton signupButtonWelcome">Sign Up</button><br/><button class = "customizeButton loginButtonWelcome">Login</button>
			</div>
		</div>
	<script src = "js/authenticationHelper.js"></script>
	</body>
</html>