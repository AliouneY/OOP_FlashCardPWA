<?php

	class DB
	{
		private $host = "127.0.0.1";
		private $db_name = "oop_flashcardpwa";
		private $db_uname = "root";
		private $db_pass = "";
		private $db_socket_type = "mysql";
		
		private $instance = NULL;
		
		public function __construct()
		{
			if($this->instance == NULL)
			{
				try
				{
					$dbInstance = new PDO("".$this->db_socket_type.":dbname=".$this->db_name.";host=".$this->host, $this->db_uname, $this->db_pass);
					$this->instance = $dbInstance;
				}
				catch(PDOException $e)
				{
					echo "Connection failed: " . $e->getMessage();
				}
			}
		}
		
		public function runQuery($query) //I would've named this query, but I realized that another query function exists
		{
			$sqlQuery = $this->instance->prepare($query);
			$sqlQuery->execute();
			return $sqlQuery;
		}
		
	}