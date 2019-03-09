<?php
	
	include 'db.php';
	
	session_start();
	
	interface appFunctionality
	{
		public static function getItems();
		public static function storeItem();
	}
	
	class Accounts
	{
		public static function loginUser()
		{
			$db = new DB();
			
			$userInfo = Array();
			$user = $_POST['nameoremail'];
			$pass = $_POST['pass'];
			
			if($user != "" && $pass != "")
			{
				$query0 = $db->runQuery("SELECT * FROM users WHERE u_email = '$user' OR u_name = '$user'");
				$numMatchingUsers = $query0->rowCount();
				if($numMatchingUsers === 1)
				{
					$password = sha1($pass);
					$query0 = $db->runQuery("SELECT * FROM users WHERE u_pass = '$password'");
					$numMatchingPasswords = $query0->rowCount();
					if($numMatchingPasswords === 1)
					{
						$userInfo = $query0->fetch(PDO::FETCH_ASSOC);
						$userId = $userInfo['id'];
						$userName = $userInfo['u_name'];
						$query1 = $db->runQuery("INSERT INTO logins (user_id, user_name, time) VALUES ('$userId', '$userName', NOW())");
						
						if($query0 != false && $query1 != false)
						{
							$_SESSION['id'] = $userInfo['id'];
							$_SESSION['user'] = $userInfo['u_name'];
							$_SESSION['email'] = $userInfo['u_email'];
							echo "success!";
						}
						else
						{
							echo "Something went wrong! " . $query1->errorInfo();
						}
					}
					else
					{
						echo "Invalid Email/Username Or Password";
					}
				}
				else
				{
					echo "Invalid Email/Username Or Password";
				}
			}
			else
			{
				echo "Invalid Email/Username Or Password";
			}
			unset($db);
		}
		
		public static function logoutUser()
		{
			$db = new DB();
			$id = $_SESSION['id'];
			$user = $_SESSION['user'];
			$email = $_SESSION['email'];
			
			$query0 = $db->runQuery("INSERT INTO logouts (user_id, user_name, time) VALUES ('$id', '$user', NOW())");
			print_r($_SESSION);
			
			session_unset();
			session_destroy();
			print_r($_SESSION);
			unset($db);
		}
		
		public static function signupUser()
		{
			$db = new DB();
			
			$email = $_POST['yeMail'];
			$name = $_POST['yeName'];
			$pass = $_POST['yePass'];
			$confirmPass = $_POST['yeConfirm'];
			
			if($email !== "" && $name !== "" && $pass !== "" && $confirmPass !== "")
			{
				if(filter_var($email, FILTER_VALIDATE_EMAIL))
				{
					$query0 = $db->runQuery("SELECT * FROM users WHERE u_email = '$email'");
					$numMatchingEmails = $query0->rowCount();
					if($numMatchingEmails === 0)
					{
						if($pass === $confirmPass)
						{
							//hash the password
							$uPass = sha1($pass);
							$query0 = $db->runQuery("SELECT * FROM users WHERE u_pass = '$uPass'");
							$numMatchingPasswords = $query0->rowCount();
							if($numMatchingPasswords === 0)
							{
								$query0 = $db->runQuery("INSERT INTO users (u_email, u_name, u_pass) VALUES ('$email', '$name', '$uPass')");
								$user_id = $db->getLastInsertedId();
								
								$query1 = $db->runQuery("INSERT INTO accountscreated (user_id, user_name, time) VALUES ('$user_id', '$name', NOW())");
								
								if($query0 != false && $query1 != false)
								{
									echo "success!";
								}
							}
							else
							{
								echo "Password Already Exists...Please Choose Another";
							}
						}
						else
						{
							echo "Passwords Don't Match...";
						}
					}
					else
					{
						echo "Email Already Exists...Please Choose Another";
					}
				}
				else
				{
					echo "Must Enter Valid Email Address...";
				}
			}
			else
			{
				echo "Must Fill Out All Fields..."; 
			}
			unset($db);
		}
	}
	
	class subjectSystem implements appFunctionality
	{
		public static function getItems()
		{
			if(isset($_SESSION['id']))
			{
				$uId = $_SESSION['id'];
				$subjects = Array();
				$db = new DB();
				$query0 = $db->runQuery("SELECT * FROM subjects WHERE creator_id = '$uId'");
				
				while($rows = $query0->fetch(PDO::FETCH_ASSOC))
				{
					$subjects[] = $rows;
				}
				echo json_encode($subjects);
				unset($db);
			}
			else
			{
				echo "No ID!";
			}
		}
		
		public static function storeItem()
		{
			$db = new DB();
			
			if(isset($_POST['subject']))
			{
				$subject = $_POST['subject'];
				$id = $_SESSION['id'];
				$query0 = $db->runQuery("INSERT INTO subjects (creator_id, subject) VALUES ('$id', '$subject')");
				if($query0 != false)
				{
					echo "Successfully entered " . $subject . " into the database";
				}
			}
			unset($db);
		}
		
		public static function deleteItem($id)
		{
			$db = new DB();
			$deletor_id = $_SESSION['id'];
			$topicIdArray = Array();
			$query0 = $db->runQuery("SELECT topic_id FROM subject_topic_bridge WHERE subj_id = '$id'");
			$topicIdArray = $query0->fetchAll(PDO::FETCH_COLUMN);
			for($i = 0; $i < sizeof($topicIdArray); $i++)
			{
				topicSystem::deleteItem($topicIdArray[$i]);
			}
			$query1 = $db->runQuery("DELETE FROM subjects WHERE id = '$id'");
			$query2 = $db->runQuery("INSERT INTO subject_deletes (deletor_id, subject_id, delete_time) VALUES ('$deletor_id', '$id', NOW())");
			
			if($query0 != false)
			{
				echo "Deleted Subject";
			}
			else
			{
				echo "Something went wrong in deleting this subject!";
			}
			unset($db);
		}
	}
	
	class topicSystem implements appFunctionality
	{
		public static function getItems() //first we need to get the id of chosen subject, get all the bridge values of said id, get the ids of the topics into some sort of array, then return a json encoding of that
		{
			$db = new DB();
			$topicIdArray = Array();
			$topics = Array();
			if(isset($_POST['subjId']))
			{
				$subjId = $_POST['subjId'];
				$query0 = $db->runQuery("SELECT topic_id FROM subject_topic_bridge WHERE subj_id = '$subjId'");
				if($query0 != false)
				{
					$topicIdArray = $query0->fetchAll(PDO::FETCH_COLUMN);
					
					$topicIds = "(" . implode(",", $topicIdArray) . ")";

					$query0 = $db->runQuery("SELECT * FROM topics WHERE id IN " . $topicIds);
					
					if($query0 != false)
					{
						while($rows = $query0->fetch(PDO::FETCH_ASSOC))
						{
							$topics[] = $rows;
						}
						echo json_encode($topics);
					}
				}
			}
			else
			{
				echo "Ya Failed!";
			}
			unset($db);
		}
		
		public static function storeItem()
		{
			$db = new DB();
			if(isset($_POST['topic']) && isset($_POST['subjId']))
			{
				$id = $_SESSION['id'];
				$topic = $_POST['topic'];
				$subjId = $_POST['subjId'];
				$topicId = "";
				
				$query0 = $db->runQuery("INSERT INTO topics (creator_id, topic) VALUES ('$id', '$topic')");
				
				if($query0 != false)
				{
					echo "Successfully entered " . $topic . " into the database \n";
					$topicId = $db->getLastInsertedId();
				}
				if($topicId !== "")
				{
					$query0 = $db->runQuery("INSERT INTO subject_topic_bridge (subj_id, topic_id) VALUES ('$subjId', '$topicId')");
					if($query0 !== false)
					{
						echo "Successfully entered " . $topic . ", id = " . $topicId . ", into subject_topic_bridge table \n";
					}
				}
			}
			unset($db);
		}
		
		public static function deleteItem($id)
		{
			$db = new DB();
			$deletor_id = $_SESSION['id'];
			$cardIdArray = Array();
			$query0 = $db->runQuery("SELECT flashcard_id FROM topic_flashcard_bridge WHERE topic_id = '$id'");
			$cardIdArray = $query0->fetchAll(PDO::FETCH_COLUMN);
			for($i = 0; $i < sizeof($cardIdArray); $i++)
			{
				flashcardSystem::deleteItem($cardIdArray[$i]);
			}
			$query1 = $db->runQuery("DELETE FROM topics WHERE id = '$id'");
			$query2 = $db->runQuery("INSERT INTO topic_deletes (deletor_id, topic_id, delete_time) VALUES ('$deletor_id', '$id', NOW())");
			
			if($query0 != false)
			{
				echo "Deleted Topic";
			}
			else
			{
				echo "Something went wrong in deleting this topic!";
			}
			unset($db);
		}
	}
	
	class flashcardSystem implements appFunctionality
	{
		public static function getItems()
		{
			$db = new DB();
			$cardIdArray = Array();
			$flashcards = Array();
			
			if($_POST['topicId'])
			{
				$topicId = $_POST['topicId'];
				
				$query0 = $db->runQuery("SELECT flashcard_id FROM topic_flashcard_bridge WHERE topic_id = '$topicId'");
				if($query0 != false)
				{
					$cardIdArray = $query0->fetchAll(PDO::FETCH_COLUMN);
					
					$cardIds = "(" . implode(",", $cardIdArray) . ")";

					$query0 = $db->runQuery("SELECT * FROM flashcards WHERE id IN " . $cardIds);
					
					if($query0 != false)
					{
						while($rows = $query0->fetch(PDO::FETCH_ASSOC))
						{
							$flashcards[] = $rows;
						}
						for($i = 0; $i < sizeof($flashcards); ++$i)
						{
							$flashcards[$i]['front'] = base64_encode($flashcards[$i]['front']);
							$flashcards[$i]['back'] = base64_encode($flashcards[$i]['back']);
						}
						echo json_encode($flashcards);
					}
					else
					{
						echo "Something Is Wrong With The Card Fetch!";
					}
				}
				
			}
			unset($db);
		}
		
		public static function storeItem()
		{
			$db = new DB();
			
				if(isset($_POST['topicId']) && count($_FILES['fileFront']['tmp_name']) === 1 && count($_FILES['fileBack']['tmp_name']) === 1)
				{
					$id = $_SESSION['id'];
					$topicId = $_POST['topicId'];
					$feedbackVar = $_FILES['fileFront']['name'][0];
					$front = addslashes(file_get_contents($_FILES['fileFront']['tmp_name']));
					$back = addslashes(file_get_contents($_FILES['fileBack']['tmp_name']));
					
					$query0 = $db->runQuery("INSERT INTO flashcards (creator_id, front, back) VALUES ('$id', '$front', '$back')");
					
					if($query0 != false)
					{	
						$cardId = $db->getLastInsertedId();
						$query0 = $db->runQuery("INSERT INTO topic_flashcard_bridge (topic_id, flashcard_id) VALUES ('$topicId', '$cardId')");
					}
					else
					{
						echo $query0;
					}
				}
				else
				{
					echo "Something Went Wrong!";
					print_r($_POST);
					print_r($_FILES);
				}
				
			unset($db);
		}
		
		public static function deleteItem($id)
		{
			$db = new DB();
			$deletor_id = $_SESSION['id'];
			
			$query0 = $db->runQuery("DELETE FROM flashcards WHERE id = '$id'");
			$query1 = $db->runQuery("DELETE FROM topic_flashcard_bridge WHERE flashcard_id = '$id'");
			$query2 = $db->runQuery("INSERT INTO card_deletes (deletor_id, card_id, delete_time) VALUES ('$deletor_id', '$id', NOW())");
			if($query0 != false)
			{
				echo "Deleted Item!";
			}
			else
			{
				echo "Something went wrong with the delete!";
			}
			unset($db);
		}
	}