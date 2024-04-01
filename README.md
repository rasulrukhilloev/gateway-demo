Example Nestjs microservices with different transports(GRPC, Kafka, Rabbit, NATS)  

1) TO INSTALL packages of all services, RUN:  
If on windows, then npm run install:win  
If on Mac/Linux, then npm run install:unix  
  
2) TO RUN containers:  
docker compose up  

Hot-reload is setup for dev mode(change variable MODE "dev" "production")  

Services: Gateway(forwards request to other services), Auth, Cards, Loan, Deposit.  
Each service has separate DB(Postgres)  
ORM: Prisma

Communication between Gateway and:  
Auth is via GRPC  
Cards is via Kafka  
Loan is via RabbitMQ  
Deposit is via NATS  

Authentication is with JWT(only access token is issued)  
Dockerized all services  
  
Endpoints:  
Gateway: Login, CreateUser(not protected for convenience)  
CRUD for Users, Cards, Loan and Deposit  

TODO:

1) complete Auth, implement refresh-token
2) complete crud(getOne, remove, update all by user)
