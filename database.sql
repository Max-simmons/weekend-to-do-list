CREATE TABLE "toDoApp" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(100),
	"done" VARCHAR (10)
	);
	
INSERT INTO "toDoApp"
	("task", "done")
	VALUES
	('Walk the Dog', 'Not Done');
	
INSERT INTO "toDoApp"
	("task", "done")
	VALUES
	('Mow the Lawn', 'Not Done'),
	('Clean the Dishes', 'Done'),
	('Take out the trash', 'Not Done');
	

