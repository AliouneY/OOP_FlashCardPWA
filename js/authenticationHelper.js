var sessionExists;
$(document).ready(function(){$.ajax({method: "POST", url: "phpScripts/checkSession.php", success: function(data)
		{
			if(data == true)
			{
				console.log("Request Sent!"); 
				sessionExists = true;
				if(sessionExists)
				{
					location.href = "homepage.php";
				}
			}
			else
			{
				sessionExists = false;
				var onLoginPage = false;
				var onSignUpPage = false;

				$(".loginButtonWelcome").click(function() //as of now, because you use click events, the user can't submit the form by pressing enter. You should fix this later
					{
						var nameOrEmail, password;
						if(!onLoginPage)
						{
							$("#welcomeMessage").css("display","none");
							$("#authenticationHandle").css("display", "block");
							$("#signupSection").html("");
							$("#signupSection").css("display","none");
							$("#loginSection").css("display","block");
							$("#loginSection").html("<input type = \"text\" class = \"customizeInput loginInput\" placeholder = \"Username/Email\" name = \"loginUserEmail\"/><br/><br/>\
									<input type = \"password\" class = \"customizeInput loginInput\" placeholder = \"Password\" name = \"loginPassword\"/><br/>\
									<p class = \"errorMessage\"></p>");
							
							$("input").keypress(function(e)
								{
									if(e.which == 13)
									{
										nameOrEmail = $("input[name = loginUserEmail]").val();
										password = $("input[name = loginPassword]").val();
										
										$.ajax({
											method: "POST",
											url: "phpScripts/login.php",
											data: {nameoremail: nameOrEmail, pass: password},
											success: function(data)
											{
												if(data === "success!")
												{
													//go to home page
													onLoginPage = false;
													$("#loginSection").html("");
													location.href = "homepage.php";
												}
												else
												{
													$(".errorMessage").html(data);
												}
											}
										});
									}
								});
							onSignUpPage = false;
							onLoginPage = true;
						}
						else
						{
							//ajax request; if user logs in, send to home page and remove event listeners, else make error message
							nameOrEmail = $("input[name = loginUserEmail]").val();
							password = $("input[name = loginPassword]").val();
							
							$.ajax({
								method: "POST",
								url: "phpScripts/login.php",
								data: {nameoremail: nameOrEmail, pass: password},
								success: function(data)
								{
									if(data === "success!")
									{
										//go to home page
										onLoginPage = false;
										$("#loginSection").html("");
										location.href = "homepage.php";
									}
									else
									{
										$(".errorMessage").html(data);
									}
								}
							});
						}
					});
		
				$(".signupButtonWelcome").click(function()
					{
						var email, name, password, confirmPassword;
						if(!onSignUpPage)
						{
							console.log("click");
							$("#welcomeMessage").css("display","none");
							$("#authenticationHandle").css("display", "block");
							$("#loginSection").html("");
							$("#loginSection").css("display","none");
							$("#signupSection").css("display","block");
							$("#signupSection").html("<input type = \"text\" class = \"customizeInput loginInput\" placeholder = \"Email\" name = \"signupEmail\"/><br/><br/>\
									<input type = \"text\" class = \"customizeInput loginInput\" placeholder = \"Username\" name = \"signupUsername\"/><br/><br/>\
									<input type = \"password\" class = \"customizeInput loginInput\" placeholder = \"Password\" name = \"signupPassword\"/><br/><br/>\
									<input type = \"password\" class = \"customizeInput loginInput\" placeholder = \"Confirm Password\" name = \"signupConfirm\"/><br/>\
									<p class = \"errorMessage\"></p>");
							
							$("input").keypress(function(e)
								{
									if(e.which == 13)
									{
										email = $("input[name = signupEmail]").val();
										name = $("input[name = signupUsername]").val();
										password = $("input[name = signupPassword]").val();
										confirmPassword = $("input[name = signupConfirm]").val();
										
										$.ajax({
											method: "POST",
											url: "phpScripts/signup.php",
											data: {yeMail: email, yeName: name, yePass: password, yeConfirm: confirmPassword},
											success: function(data)
											{
												if(data === "success!")
												{
													//go to login page; handle that whole email confirmation thing
													console.log(data);
													onSignUpPage = false;
													$("#signupSection").html("<p class = \"font300\">You Have Successfully Created An Account! Now Login To Begin Making Flashcards!</p>");
												}
												else
												{
													$(".errorMessage").html(data);
												}
											}
										});
									}
								});
							
							onLoginPage = false;
							onSignUpPage = true;
						}
						else
						{
							//ajax request, etc.
							email = $("input[name = signupEmail]").val();
							name = $("input[name = signupUsername]").val();
							password = $("input[name = signupPassword]").val();
							confirmPassword = $("input[name = signupConfirm]").val();
							
							$.ajax({
								method: "POST",
								url: "phpScripts/signup.php",
								data: {yeMail: email, yeName: name, yePass: password, yeConfirm: confirmPassword},
								success: function(data)
								{
									if(data === "success!")
									{
										//go to login page; handle that whole email confirmation thing
										console.log(data);
										onSignUpPage = false;
										$("#signupSection").html("<p class = \"font300\">You Have Successfully Created An Account! Now Login To Begin Making Flashcards!</p>");
									}
									else
									{
										$(".errorMessage").html(data);
									}
								}
							});
						}
					});
			}
		}
	});
});
