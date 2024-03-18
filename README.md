Services: Gateway, Auth, Cards, Transaction.

Communication between services is via RabbitMQ

Authentication is with JWT
DB: Postgres
ORM: Prisma
Dockerized all services, containers are run via docker-compose


Endpoints:
Gateway: signup, login, verifyUser,
Auth: createUser, createToken, verifyToken
Cards: getCardByUser, getCardsByUser, deleteCardByUser

Transaction: getUserBalance, addUserBalance, removeUserBalance (with db transaction)

Models:
User:
id, email, password, name, createdAt
Card:
id, number, status, expDate, createdAt, updatedAt
Transaction:
id, status, user1, user2, createdAt