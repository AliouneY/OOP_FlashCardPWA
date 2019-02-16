<?php

	include 'db.php';

	interface appFunctionality
	{
		public static function getItems();
		public static function storeItem();
	}
	
	class subjectSystem implements appFunctionality
	{
		public static function getItems()
		{
			$subjects = Array();
			$db = new DB();
			$query0 = $db->runQuery("SELECT * FROM subjects");
			
			while($rows = $query0->fetch(PDO::FETCH_ASSOC))
			{
				$subjects[] = $rows;
				/*$innerHtml = $innerHtml . "<a class = \"content\">
												<div>
													<img class = \"labelImg\" src = \"icons/bookIcon.png\"/><div class = \"colon\">:</div>
												</div>
												<label class = \"contentLabel subject\">". $subjects['subject'] ."</label>
											</a><br/>";*/
			}
			echo json_encode($subjects);
			unset($db);
		}
		
		public static function storeItem()
		{
			$db = new DB();
			
			if(isset($_POST['subject']))
			{
				$subject = $_POST['subject'];
				$query0 = $db->runQuery("INSERT INTO subjects (subject) VALUES ('$subject')");
				if($query0 !== false)
				{
					echo "Successfully entered " . $subject . " into the database";
				}
			}
			unset($db);
		}
		
	}
	
	class topicSystem implements appFunctionality
	{
		public static function getItems()
		{
		}
		
		public static function storeItem()
		{
		}
	}
	
	class flashcardSystem
	{
	}