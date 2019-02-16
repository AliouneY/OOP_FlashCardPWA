var subjects;
var dt;

function addSubjectFunctionality()
{
	/*
	for debugging purposes
	*/
	dt = new Date();
	getSubjects();
	var newDivExists = false;
	var newSubject;
	$('.addButton').click(function()
						  {
							  console.log("newDivExists = " + newDivExists);
							  if(!newDivExists)
							  {
								  newDivExists = true;
								$('#subjects').prepend("<div id = \"newSubject\" class = \"content\">\
															<div>\
																<img class = \"labelImg\" src = \"icons/bookIcon.png\"/><div class=\"colon\">:</div>\
															</div>\
															<input class = \"customizeInput\" type = \"text\" placeholder = \"Subject Name\"></input>\
															<a class = \"cancelButton\">Cancel</a>\
														</div><br/>");
							  }
							  
							  $(".customizeInput").keypress(function(e)
														  {
															  if(e.which == 13)
															  {
																  e.preventDefault();
																  newSubject = $(this).val();
																  console.log("newSubject = " + newSubject + "numInputs = " + $(".customizeInput").length);
																  $.ajax({
																		method: 'POST',
																		url: 'phpScripts/subjectStoreItems.php',
																		data: {subject: newSubject},
																		success: function(data)
																				{
																					console.log(data);
																					$('#subjects').html("<input type = \"button\" class = \"addButton\" value = \"+\"/>");
																					newDivExists = false;
																					console.log("newDivExists = " + newDivExists);
																					getSubjects();
																				}
																		});
															  }
														  });
							  
							  $(".cancelButton").click(function()
													 {
														 $(this).parent().remove();
														 newDivExists = false;
													 });
						  });
						  
	$('.content.subject').click(function()
						{
							console.log("Clicked");
						});
}

function getSubjects()
{
	console.log("getting subjects " + dt.getTime());
	$.ajax({
				method: 'POST',
				url: 'phpScripts/subjectGetItems.php',
				success: function(data)
						{
							var innerHtml = "";
							subjects = JSON.parse(data);
							console.log("From within getSubjects(): subjects.length = " + subjects.length + "; subjects[0].subject = "+subjects[0].subject + " " + dt.getTime());
							for(var i = 0; i < subjects.length; i++)
							{
								innerHtml += "<a class = \"content subject\">\
												<div>\
													<img class = \"labelImg\" src = \"icons/bookIcon.png\"/><div class = \"colon\">:</div>\
												</div>\
												<label class = \"contentLabel\">" + subjects[i].subject +"</label>\
											</a><br/>";
							}
							$('#subjects').prepend(innerHtml);
						}
			});
}

function getIdFromSubject(target)
{
	for(var i = 0; i < subjects.length; i++)
	{
		if(subjects[i].subject === target)
		{
			return subjects[i].id;
		}
	}
}

window.addEventListener('DOMContentLoaded', addSubjectFunctionality());
