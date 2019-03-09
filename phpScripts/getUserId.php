<?php
	include "../classes/app.php";
	
	if(isset($_SESSION['id']))
	{
		echo $_SESSION['id'];
	}