## Installation
Clone repository and install dependencies

```bash
npm i
```
## Database

After installation setup database connection for development in config/config.json


## Migration
After database setup run migration and seeder to setup dummy data in tables

```migration
npx sequelize-cli db:migrate
```
```seed
npx sequelize-cli db:seed:all
```
## Postman
You can test all apis via [postman collection](https://api.postman.com/collections/13534208-898818e9-862d-4419-b8a4-c28cf8ff1e36?access_key=PMAT-01GTCEW11WZ5MNMDP7WQ9SHY3P)