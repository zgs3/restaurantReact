# Restaurant review app - Front end

Full stack project made using React JS for frontend part and Laravel for creating API resources stored in MySQL database.

App is designed to require user to create account and login first.
User is able to view data about restourants (titles, adresses..) and dishes available in those restaurants. Also user is able to rate dishes and see the average rating score. All data is fetched from the database.

Also admin account is available and admin can make CRUD operations - create, update and delete restaurants and dishes.

# Starting the app

* ! Before runing this app you must first install and start backend part of this project. !

[Backend project repository](https://github.com/zgs3/restaurantApi).

1. Complete [BE project part](https://github.com/zgs3/restaurantApi) launch instructions.
2. Clone this repository using GitBash CLI.
3. Open project folder using VSCode or other prefered code editor.
4. Open GitBash terminal and run command `npm install`.
5. Run command `npm start`.
   - Note that project is configured to fetch API data from http://127.0.0.1:8000/api/v1/... So Laravel project must be started using this local IP and port 8000.
6. Now you can log in using Admin credentials (written below) or registering a new user and loging with newly registered credentials.

## How to use the app

As a simple user:

* First you have to register a new user in registration page.
* Then you can login in the login page.

As an admin:

* You can log in using admin credentials,

Email: adm@adm.com
Password: admin1

## Techniques used

App made using React JS.

Styled using Bootstrap library.

## Authors

Project made by me - Žygimantas Kairaitis. 

Find me on [LinkedIn](https://www.linkedin.com/in/%C5%BEygimantas-kairaitis-018a86193/).
