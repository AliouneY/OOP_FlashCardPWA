<?php 
	include "../classes/app.php";
	
	$sessionExists = false;
	
	if(isset($_SESSION['id']))
	{
		$sessionExists = true;
	}
	else
	{
		$sessionExists = false;
	}
	
	echo $sessionExists;