CREATE TABLE "toDoApp" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(100)
	);
	
INSERT INTO "toDoApp"
	("task")
	VALUES
	('Walk the Dog');
	
INSERT INTO "toDoApp"
	("task")
	VALUES
	('Mow the Lawn'),
	('Clean the Dishes'),
	('Take out the trash');
