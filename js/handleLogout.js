$("#logoutButton").click(function(e)
{
	e.preventDefault();
	$.ajax({
		method: "POST",
		url: "phpScripts/logout.php",
		success: function(data)
		{
			location.href = "index.php"; //make it go to the main index page after the logout
		}
	});
});