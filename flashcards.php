<!Doctype html>
<html>
	<head> 
		<link href = "css/mobileStyle.css" media = "screen and (max-device-width: 592px)" rel = "stylesheet" type = "text/css"/>
		<!--<link href = "pwaFiles/manifest.json" rel = "manifest"/>-->
		<script src = "https://code.jquery.com/jquery-3.3.1.min.js"></script>
	</head>

	<body>
		<div id = "container">
			<div id = "appContentContainer">
				<div id = "header">
					<div id = "title"> <!--Don't forget to add a back button or something-->
						<h1>SUBJECT</h1>
					</div>
					<div id = "path">
					</div>
				</div>
				<div id = "cardAppContainer">
				</div>
				<form id = "fileContent" class = "contentContainer">         <!--Remember to change the name of the icons folder to something else (at least if you are using 000webhost)-->
					<input type = "button" class = "addButton" value = "+"/>
				</form>
			</div>
		</div>
		<script src = "js/structure.js"></script>
		<!--<script src = "pwaFiles/register_service_worker.js"></script>-->
	</body>
</html>