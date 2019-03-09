<?php
	include "../classes/app.php";
	
	if(isset($_POST['cardId']))
	{
		flashcardSystem::deleteItem($_POST['cardId']);
	}
	else
	{
		echo "Missing ID!";
	}