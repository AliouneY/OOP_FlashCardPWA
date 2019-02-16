<?php
	include 'classes/app.php';
?>
<!Doctype html>
<html>
	<head>
		<link href = "css/mobileStyle.css" media = "screen and (max-device-width: 592px)" rel = "stylesheet" type = "text/css"/>
		<script src = "https://code.jquery.com/jquery-3.3.1.min.js"></script>
	</head>

	<body>
		<div id = "container">
			<div id = "header">
				<div id = "title">
					<h1>SUBJECT</h1>
				</div>
				<div id = "path">
				</div>
			</div>
			<form id = "subjects" class = "contentContainer">
				<input type = "button" class = "addButton" value = "+"/>
			</form>
		</div>
		<script src = "js/subject.js"></script>
	</body>
</html>