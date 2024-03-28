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
Gateway: Login, CreateUser(not protected)  
CRUD for Users, Cards, Loan and Deposit  
