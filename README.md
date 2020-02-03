# vidly
UdemyLearning
----------------------------------------------------------
------------------USER REGISTRATION-----------------------
----------------------------------------------------------
POST - https://secret-ridge-39056.herokuapp.com/api/users

Request Body
{
	"name": "Test User2",
	"email": "testuser2@chandan.com",
	"password": "123456",
	"role": "Admin",
	"userLevel": 1
}

Response - User Object

TO GET x-auth-token

POST - https://secret-ridge-39056.herokuapp.com/api/auth

Request Body
{
	"email": "testuser1@chandan.com",
	"password": "123456"
}

Response - JSON Web Token

GET - https://secret-ridge-39056.herokuapp.com/api/programs

Request Header 

x-auth-token = token received from https://secret-ridge-39056.herokuapp.com/api/auth

Response - Programs Object