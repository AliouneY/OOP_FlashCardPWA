<?php
	include "../classes/app.php";
	
	if(isset($_POST['topicId']))
	{
		topicSystem::deleteItem($_POST['topicId']);
	}
	else
	{
		echo "Missing Topic ID!";
	}