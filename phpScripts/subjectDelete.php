<?php
	include "../classes/app.php";
	
	if(isset($_POST['subjectId']))
	{
		subjectSystem::deleteItem($_POST['subjectId']);
	}
	else
	{
		echo "Missing Subject ID!";
	}