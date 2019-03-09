<!Doctype html>
<html>
	<head>
		<link href = "css/mobileStyle.css" media = "screen and (max-device-width: 592px)" rel = "stylesheet" type = "text/css"/>
		<script src = "https://code.jquery.com/jquery-3.3.1.min.js"></script>
	</head>

	<body onload = "pageFunctionality()">
		<form id = "container">
			<button id = "flashcardsButton" class = "customizeButton" onclick = "location.href = '../flashcards.php';">Flashcards</button><br/><br/>
			<button id = "feedbackButton" class = "customizeButton">Feedback</button><br/><br/>
			<button id = "logoutButton" class = "customizeButton">Logout</button>
		</form>
	<script src = "js/handleLogout.js"></script>
	<script>
		function pageFunctionality()
		{
			$("#flashcardsButton").click(function(e){e.preventDefault(); location.href = "flashcards.php";});
			$("feedbackButton").click(function(e){e.preventDefault(); location.href = "feedback.php";});
		}
	</script>
	</body>
</html>