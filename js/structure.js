var subjects; //an array of subject data 
var topics; //an array of topic data          
var cardData; // an array of image data
var newDivExists;
var keyEventAdded;
var currentPage = {title: "subject", inputPlaceholder: "Subject Name", inputIcon: "appImages/bookIcon.png"}
var clickedSubj = {subject: ""}
var clickedTopic = {topic: ""}

function addFunctionality()
{
	checkSessionStatus();
	displayPath();
	getSubjects();
	newDivExists = false;
	keyEventAdded = false;
	var newSubject;
	var newTopic;
	
	
	$('.addButton').click(function() //if add button clicked
						  {
							
							  if(!newDivExists) //if this div doesn't already exist
							  {
								  newDivExists = true;                                                       //display to the user a tool for entering subjects
								
								if(!keyEventAdded) //if the key event hasn't already been added (such that if this button is pressed more than once it will not keep adding the event)
								{
									if(currentPage.title === "subject")
									{
										$('.addButton').before("<div id = \"newContent\" class = \"content\">\
															<div>\
																<img class = \"labelImg\" src = \"" + currentPage.inputIcon + "\"/><div class=\"colon\">:</div>\
															</div>\
															<input class = \"customizeInput\" type = \"text\" placeholder = \"" + currentPage.inputPlaceholder + "\"></input>\
															<a class = \"cancelButton\">Cancel</a>\
														</div><br/>");
														
										keyEventAdded = true;
										$(".customizeInput").keypress(function(e) 
													{
														if(e.which == 13)
														{
															e.preventDefault();
															newSubject = $(this).val();
															
															$.ajax(
															{
																method: 'POST',
																url: 'phpScripts/subjectStoreItems.php',
																data:
																{
																	subject: newSubject
																},
																success: function(data)
																{
																	
																	 $("#newContent").remove();             //after successfully storing the item, deletes the div, remove all the divs, and retrieve the subjects anew
																	 $(".customizeInput").off("keypress");
																	 newDivExists = false;
																	 keyEventAdded = false;
																	$('.content.subject').remove();
																	getSubjects();
																}
															});
														}
													});
									}
									else if(currentPage.title === "topic")
									{
										$(".addButton").before("<div id = \"newContent\" class = \"content\">\
															<div>\
																<img class = \"labelImg\" src = \"" + currentPage.inputIcon + "\"/><div class=\"colon\">:</div>\
															</div>\
															<input class = \"customizeInput\" type = \"text\" placeholder = \"" + currentPage.inputPlaceholder + "\"></input>\
															<a class = \"cancelButton\">Cancel</a>\
														</div><br/>");
														
										keyEventAdded = true;
										$(".customizeInput").keypress(function(e) 
													{
														if(e.which == 13)
														{
															e.preventDefault();
															newTopic = $(this).val();
															
															$.ajax(
															{
																method: 'POST',
																url: 'phpScripts/topicStoreItems.php', 
																data:
																{
																	topic: newTopic, subjId: clickedSubj.id
																},
																success: function(data)
																{
																	 $("#newContent").remove();             //after successfully storing the item, delete the div, remove all the divs, and retrieve the topics anew
																	 $(".customizeInput").off("keypress");
																	 newDivExists = false;
																	 keyEventAdded = false;
																	$('.content.topic').remove();
																	getTopics();
																}
															});
														}
													});
									}
									else if(currentPage.title === "flashcards")
									{
										keyEventAdded = true; //for the flashcard we use keyEvent to mean add card event and whatever else
										$(".addButton").before("<div class = \"defaultFlashcardContainer\">\
																		<label class = \"frontback flashcardHorizLabel\">front/back</label><br/>\
																		<div class = \"imgContain1\">\
																			<input id = \"fileFront\" type = \"file\" accept = \"image/*\" capture=\"environment\" name = \"fileFront\"/>\
																			<div class = \"flashcardFront newCard\">\
																			</div>\
																		</div>\
																		<div class = \"imgContain2\">\
																			<input id = \"fileBack\" type = \"file\" accept = \"image/*\" capture=\"environment\" name = \"fileBack\"/>\
																			<div class = \"flashcardBack newCard\">\
																			</div>\
																		</div>\
																		<input class = \"thisIsAHackBecauseICouldntFigureOutHowToSendThisDataWithTheRestOfTheFormDataViaAjaxSoFixInTheFuture\" name = \"topicId\" value = \"" + clickedTopic.id + "\"/>\
																		<input class = \"flashcardHorizLabel addCardButton\" type = \"submit\" value = \"Add Card\" name = \"submit\">\
																		<a class = \"cancelButton flashcardHorizLabel\">Cancel</a>\
																	</div>");
																	
										var flashcardFront = $(".flashcardFront.newCard");
										var flashcardBack = $(".flashcardBack.newCard");
										$("#fileFront").change(displayChosenImage.bind(flashcardFront));
																	
										$(".frontback").click(function() //makes it so that you can switch between front and back of new flashcard
															{
																var frontSide = $(".imgContain1");
																var backSide = $(".imgContain2");
																var frontFile = $("#fileFront");
																var backFile = $("#fileBack");
																
																if(frontSide.is(":visible") && backSide.is(":hidden"))
																{
																	frontSide.hide();
																	frontFile.off("change");
																	backSide.show();
																	backFile.change(displayChosenImage.bind(flashcardBack));
																}
																else if(backSide.is(":visible") && frontSide.is(":hidden"))
																{
																	backSide.hide();
																	backFile.off("change");
																	frontSide.show();
																	frontFile.change(displayChosenImage.bind(flashcardFront));
																}
															});
															
										$("#fileContent").submit(function(e)
																{
																	e.preventDefault();
																	
																	var newFront = $("#fileFront");
																	var newBack = $("#fileBack");
																	
																	if(newFront.val() !== "" && newBack.val() !== "")
																	{
																		$.ajax({
																			method: 'POST',
																			url: 'phpScripts/flashcardStoreItems.php',
																			data: new FormData(this),
																			contentType: false,
																			cache: false,
																			processData: false,
																			success: function(data)
																			{
																				console.log(data);
																				$("#fileContent").off("submit");
																				newFront.off("change");
																				newBack.off("change");
																				$(".frontback").off("click");
																				keyEventAdded = false;
																				$(".defaultFlashcardContainer").remove();
																				newDivExists = false;
																				getFlashcards();
																			}
																		});
																	}
																	else
																	{
																		alert("Please Choose An Image For Each Side...");
																		//in the future, make it so that they don't have to choose more than one image if they don't want
																	}
																});
									}
								}
														
								$(".cancelButton").click(function()
													 {
														 if(currentPage.title === "subject" || currentPage.title === "topic")
														 {
															 $(this).parent().remove();
															 newDivExists = false;
															 $(".customizeInput").off("keypress");
															 keyEventAdded = false;
														 }
														 else if(currentPage.title === "flashcards")
														 {
															 $(this).parent().remove();
															 newDivExists = false;
															 $("#fileContent").off("submit");
															$("#fileFront").off("change");
															$("#fileBack").off("change");
															$(".frontback").off("click");
															keyEventAdded = false;
														 }
													 });
							  }
						  });
}

function checkSessionStatus()
{
	$.ajax({
		method: "POST",
		url: "phpScripts/checkSession.php",
		success: function(data)
		{
			if(data == false)
			{
				location.href = "index.php"; //you know, you should make all this much more secure......
			}
		}
	});
}

function displayPath() //call this every time a div is clicked
{
	$(".homeIcon").off("click");
	$(".pathClickable").off("click");
	var innerHtml = "<a href = \"homepage.php\">BACK</a><img src = \"appImages/homeIcon.png\" class = \"homeIcon\"/><div class = \"path\"></div>";
	$("#path").html(innerHtml);
	if(clickedSubj.subject !== "")
	{
		innerHtml += "<a class = \"pathClickable\">=>" + clickedSubj.subject+"</a>";
		$(".path").html("<a class = \"pathClickable\">=>" + clickedSubj.subject+"</a>");
	}
	if(clickedTopic.topic !== "")
	{
		innerHtml += "<a class = \"pathClickable\">=>" + clickedTopic.topic + "</a>";
		$(".path").html("<a class = \"pathClickable\">=>" + clickedSubj.subject+"</a> <a class = \"pathClickable\">=>" + clickedTopic.topic + "</a>");
	}
	$(".homeIcon").click(function()
		{
			enterSubjectPage();
			displayPath();
			getSubjects();
		});
	
	$(".pathClickable").click(function()
		{
			if($(this).text() === "=>" + clickedSubj.subject)
			{
				enterTopicPageFromCards();
			}
		});
}

function displayChosenImage(e) //I realise the name may be confusing; this function exists to make the image on the new flashcard appear (as a preview to the user as to what the card should look like)
{
	this.html("");
    var reader;
    var files = e.target.files;
    var f = files[0];
	var image = document.createElement("img");
	image.className = "flashcardImg";
	this.append(image);

    if(f.type.match('image.*'))
    {
        reader = new FileReader();
        reader.onload = (function(file)
        {
            return function(evt)
            {
                //handle all the image stuff in here
				image.src = evt.target.result;
            }
        })(f);

        reader.readAsDataURL(f);
    }
}

function getSubjects() //displays all subjects
{
	$.ajax({
				method: "POST",
				url: "phpScripts/subjectGetItems.php",
				success: function(data)
						{
							var innerHtml = "";
							subjects = JSON.parse(data);
							
							for(var i = 0; i < subjects.length; i++)
							{
								innerHtml += "<div class = \"content subject\">\
												<div>\
													<img class = \"labelImg\" src = \"" + currentPage.inputIcon + "\"/><div class = \"colon\">:</div>\
												</div>\
												<label class = \"contentLabel subjectLabel\">" + subjects[i].subject +"</label>\
												<input class = \"deleteFolderButton\" type = \"button\" value = \"Delete\">\
											</div><br/>";
							}
							$("br").remove();
							$(".content.subject").remove();
							$('#fileContent').prepend(innerHtml);
							$(".contentLabel.subjectLabel").click(enterTopicPageFromSubj);
							$(".deleteFolderButton").click(deleteItem);
						}
			});
}

function getTopics() //use php file to get topics
{
	var subjid = clickedSubj.id;
	$.ajax({
				method: 'POST',
				url: 'phpScripts/topicGetItems.php',
				data: {subjId: subjid},
				success: function(data)
						{
							var innerHtml = "";
							topics = JSON.parse(data);
							console.log(topics.length + " " + topics[0].topic);
							
							for(var i = 0; i < topics.length; i++)
							{                                                      
								innerHtml += "<div class = \"content topic\">\
												<div>\
													<img class = \"labelImg\" src = \"" + currentPage.inputIcon + "\"/><div class = \"colon\">:</div>\
												</div>\
												<label class = \"contentLabel topicLabel\">" + topics[i].topic +"</label>\
												<input class = \"deleteFolderButton\" type = \"button\" value = \"Delete\">\
											</div><br/><br/>";
							}
							$("br").remove();
							$('#fileContent').prepend(innerHtml);
							$(".contentLabel.topicLabel").click(enterFlashcardPage);
							$(".deleteFolderButton").click(deleteItem);
						}
			});
}

function getFlashcards()
{
	var topicid = clickedTopic.id;
	$.ajax({
		method: 'POST',
		url: 'phpScripts/flashcardGetItems.php',
		data: {topicId: topicid},
		success: function(data)
		{
			var innerHtml = "";
			cardData = JSON.parse(data);
			
			for(var i = 0; i < cardData.length; i++)
			{
				innerHtml += "<div class = \"defaultFlashcardContainer\">\
								<div class = \"cardImgContain1\">\
									<div class = \"flashcardFront card\">\
										<img class = \"cardImg\" src = \"data:image/*;base64," + cardData[i].front + "\">\
									</div>\
								</div>\
								<input class = \"flashcardHorizLabel deleteFlashcardButton\" type = \"button\" value = \"Delete\">\
							</div><br/><br/><br/>";
			}
			$("br").remove();
			$('#fileContent').prepend(innerHtml);
			$(".cardImgContain1").click(useFlashcards);
			$(".deleteFlashcardButton").click(deleteItem);
		}
	});
}

function enterTopicPageFromSubj() //judging from the name you know there is going to be a function for entering the topic page from the flashcard page (delete this comment after you make said function)
{
	var target = $(this).text();
	var subjId = getIdFromSubject(target);
	clickedSubj = {subject: target, id: subjId} //this is data that we need to enter into the database (bridge table)
	currentPage = {title: "topic", inputPlaceholder: "Topic Name", inputIcon: "appImages/folderIcon.png"}
	
	
	displayPath();
	$('.content.subject').remove();
	$("br").remove();
	$("#title").html("<h1>TOPIC</h1>");
	getTopics();
}

function enterTopicPageFromCards()
{
	currentPage.title = "topic";
	currentPage.inputPlaceholder = "Topic Name";
	currentPage.inputIcon = "appImages/folderIcon.png";
	clickedTopic.topic = "";
	clickedTopic.id = "";
	displayPath();
	$(".defaultFlashcardContainer").remove(); //remove all flashcards
	$(".content.topic").remove();
	$("#title").html("<h1>TOPIC</h1>");
	getTopics();
}

function enterSubjectPage()
{
	currentPage.title = "subject";
	currentPage.inputPlaceholder = "Subject Name";
	currentPage.inputIcon = "appImages/bookIcon.png";
	clickedSubj.subject = "";
	clickedSubj.id = "";
	clickedTopic.topic = "";
	clickedTopic.id = "";
	displayPath();
	$(".defaultFlashcardContainer").remove();
	$(".content.topic").remove();
	$(".content.subject").remove();
	$("#title").html("<h1>SUBJECT</h1>");
}

function enterFlashcardPage()
{
	var target = $(this).text();
	var targetId = getIdFromTopic(target);
	
	clickedTopic = {topic: target, id: targetId} //this is the info needed for entering flashcards into database with bridge table
	$('.content.topic').remove();
	$("br").remove();
	currentPage.title = "flashcards";
	$("#title").html("<h1>FLASHCARDS</h1>");
	displayPath();
	$("#fileContent").attr('enctype', 'multipart/form-data');
	getFlashcards();
}

function useFlashcards()
{
	console.log("Got Click");
	var card = $(this).find(".cardImg")[0].src; //the zero index is just traversing the object [$(this)] itself
	var currentCardIndex = getIndexFromCard(card);
	$("#cardAppContainer").css("display","block");
						
	$("#cardAppContainer").html("<div class = \"currentFlashcardContainer\">\
									<img class = \"flashcardHorizLabel turnSymbol\" src = \"appImages/turnIcon.png\"/><br/>\
									<div class = \"currentCardImgContain1\">\
										<div class = \"prevCard\">\
											<img class = \"arrow\" src = \"appImages/leftArrow.png\" />\
										</div>\
										<div class = \"nextCard\">\
											<img class = \"arrow\"src = \"appImages/rightArrow.png\" />\
										</div>\
										<div class = \"flashcardFront cardInUse\">\
											<img class = \"cardImg\" src = \"data:image/*;base64," + cardData[currentCardIndex].front + "\">\
										</div>\
									</div>\
									<div class = \"currentCardImgContain2\">\
										<div class = \"prevCard\">\
											<img class = \"arrow\" src = \"appImages/leftArrow.png\" />\
										</div>\
										<div class = \"nextCard\">\
											<img class = \"arrow\"src = \"appImages/rightArrow.png\" />\
										</div>\
										<div class = \"flashcardBack cardInUse\">\
											<img class = \"cardImg\" src = \"data:image/*;base64," + cardData[currentCardIndex].back + "\">\
										</div>\
									</div>\
									<a class = \"escButton flashcardHorizLabel\">esc</a>\
								</div>");
	$(".turnSymbol").click(function()
		{
			var frontSide = $(".currentCardImgContain1");
			var backSide = $(".currentCardImgContain2");

			if (frontSide.is(":visible") && backSide.is(":hidden"))
			{
				frontSide.hide();
				backSide.show();
			}
			else if (backSide.is(":visible") && frontSide.is(":hidden"))
			{
				backSide.hide();
				frontSide.show();
			}
		});
	$(".nextCard").click(function()
		{
			if(currentCardIndex < cardData.length - 1)
			{
				$(".flashcardFront.cardInUse").html(cardRenderFront(currentCardIndex + 1));
				$(".flashcardBack.cardInUse").html(cardRenderBack(currentCardIndex + 1));
				currentCardIndex += 1;
			}
			else
			{
				$(".flashcardFront.cardInUse").html(cardRenderFront(0));
				$(".flashcardBack.cardInUse").html(cardRenderBack(0));
				currentCardIndex = 0;
			}
		});
	
	$(".prevCard").click(function()
		{
			if(currentCardIndex > 0)
			{
				$(".flashcardFront.cardInUse").html(cardRenderFront(currentCardIndex - 1));
				$(".flashcardBack.cardInUse").html(cardRenderBack(currentCardIndex - 1));
				currentCardIndex -= 1; 
			}
			else
			{
				$(".flashcardFront.cardInUse").html(cardRenderFront(cardData.length - 1));
				$(".flashcardBack.cardInUse").html(cardRenderBack(cardData.length - 1));
				currentCardIndex = cardData.length - 1;
			}
		});
	
	$(".escButton").click(function()
		{
			$(".turnSymbol").off("click");
			$(".nextCard").off("click");
			$(".prevCard").off("click");
			$(".escButton").off("click");
			$("#cardAppContainer").remove(".currentFlashcardContainer");
			$("#cardAppContainer").css("display","none");
		});
}

function cardRenderFront(index)  //card render functions create innerHtml of the parents of the image elements that are supposed to be there
{
	var innerHtml = "<img class = \"cardImg\" src = \"data:image/*;base64," + cardData[index].front + "\">";
	return innerHtml;
}

function cardRenderBack(index)
{
	var innerHtml = "<img class = \"cardImg\" src = \"data:image/*;base64," + cardData[index].back + "\">";
	return innerHtml;
}

function deleteItem() //whether you call the button clicked a deleteItemButton or not, use this function to delete stuff. The first step for each thing is to bring up a modal asking the user's permission to delete. When they day yes, run some php functions and remove every event listener and modal; else, just remove the event listeners and modals
{	
	$("#cardAppContainer").css("display", "block"); 
	
	var modalHtml = "<div class = \"deleteModal\">\
						<p>Are you sure you want to delete this item?</p>\
						<button class = \"cardsYesButton customizeButton\">Yes</button><button class = \"cardsNoButton customizeButton\">No</button>\
					</div>"; 
	var target = $(this);
	$("#cardAppContainer").html(modalHtml);
	$(".cardsYesButton").click(function()
		{
			if(currentPage.title === "subject")
			{
				var subject = target.parent().find(".contentLabel").text();
				var currentSubjectId = getIdFromSubject(subject);
				
				$.ajax({
					method: 'POST',
					url: "phpScripts/subjectDelete.php",
					data: {subjectId: currentSubjectId},
					success: function(data)
					{
						console.log(data);
						$(".content.subject").remove();
						getSubjects();
					}
				});
			}
			else if(currentPage.title === "topic")
			{
				var topic = target.parent().find(".contentLabel").text();
				var currentTopicId = getIdFromTopic(topic);
				
				$.ajax({
					method: 'POST',
					url: "phpScripts/topicDelete.php",
					data: {topicId: currentTopicId},
					success: function(data)
					{
						console.log(data);
						$(".content.topic").remove();
						getTopics();
					}
				});
			}
			else if(currentPage.title === "flashcards")
			{
				var card = target.parent().find(".cardImg")[0].src; //remember that this is not getting the source info in the cardData array, but the actual source
				var currentCardIndex = getIndexFromCard(card); //convoluted and complicated, I know...sorry... see, this gets the index in the cardData array that holds the id of the card
				var currentCardId = cardData[currentCardIndex].id; //then we get the card id (the one actually in the database)
				
				$.ajax({
					method: 'POST',
					url: "phpScripts/flashcardDelete.php",
					data: {cardId: currentCardId},
					success: function(data)
					{
						console.log(data);
						$(".defaultFlashcardContainer").remove();
						getFlashcards();
					}
				});
			}
			console.log("Yes clicked"); $("cardsYesModal").off("click"); $("cardsNoModal").off("click"); $("#cardAppContainer").html(""); $("#cardAppContainer").css("display", "none");
		}); //in case you don't know from reading, these listeners just (on click) change the state of the boolean and make the modal and stuff disappear
	$(".cardsNoButton").click(function(){console.log("No clicked"); $("cardsYesModal").off("click"); $("cardsNoModal").off("click"); $("#cardAppContainer").html(""); $("#cardAppContainer").css("display", "none");});
}

function getIdFromTopic(target)
{
	for(var i = 0; i < topics.length; i++)
	{
		if(topics[i].topic === target)
		{
			return topics[i].id;
		}
	}
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

function getIndexFromCard(cardSrc)
{
	var arrayVal = cardSrc.substring(20, cardSrc.length);
	var returnVal;
	for(var i = 0; i < cardData.length; i++)
	{
		if(cardData[i].front === arrayVal)
		{
			returnVal = i;
		}
	}
	return returnVal;
}

window.addEventListener('DOMContentLoaded', addFunctionality());
