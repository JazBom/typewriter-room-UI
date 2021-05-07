# GENERAL

# The Typewriter Room App - typewriter-room-UI (for client, see 'typewriter-room-API')

**Overview**

A mobile and desktop app for the writing community which allows users to create, edit, publish and share text snippets (referred to as 'pages') in response to random or selected inspiration in the form of images and quotes. 

Front-end built in ReactJS with Bootstrap, back-end built using Ruby-on-Rails with Postgres SQL database. Material UI and CSS make it fully responsive.
___________________________________________________________________________________________________________________________________________________________

Tablet view:

![Screen Shot 2021-05-07 at 6 08 28 pm](https://user-images.githubusercontent.com/65477570/117420297-c9112f80-af60-11eb-9fe6-5671b202a9b1.png)

___________________________________________________________________________________________________________________________________________________________


Four local APIs create and access data stored in postgres through CRUD functionality and via a Ruby-on-Rails backend server. The configuration of the database tables make use of SQL entity association. 

The database includes an inspiration table, which the API passes back to the client to populate a drop-down menu allowing users to select their combination of image and quote for inspiration. Two external APIs are also integrated, which allows random inspiration objects to be generated and saved back to the inspiration table.

Users can view and rate all published pages, or can view their own published and in-draft pages. They can edit, save, publish and delete their own pages. Users cannot see in-draft pages of others. They are prevented from rating their own text snippets, and from editing or deleting those of others.

User registration and log-in functionality includes protected routes using JWT token, including checking of log-in generated token by API when data is called, and loggedIn function invoked by children components to check the existance in local storage of the JWT token.
___________________________________________________________________________________________________________________________________________________________

Mobile-view of inspiration creation:

![Screen Shot 2021-05-07 at 6 09 55 pm](https://user-images.githubusercontent.com/65477570/117420415-ecd47580-af60-11eb-824a-15fb5347fc0e.png)
![Screen Shot 2021-05-07 at 6 11 11 pm](https://user-images.githubusercontent.com/65477570/117420491-fd84eb80-af60-11eb-8cc7-104d9e7e4787.png)

Mobile-view of page creation:

![Screen Shot 2021-05-07 at 6 12 42 pm](https://user-images.githubusercontent.com/65477570/117420505-ffe74580-af60-11eb-9fdf-d9c99142e3b0.png)
![Screen Shot 2021-05-07 at 7 51 59 pm](https://user-images.githubusercontent.com/65477570/117432503-cc5ee800-af6d-11eb-8f9e-53efbb99f829.png)

______________________________________________________________________________________________________________________________________________________


**Current app issues**

Login - Password security will be enhanced by time-limiting the JWTs and creating a blacklist table for expired JWT. 

**Future plans**

I plan to add more helper/support text and pop-ups (e.g. button tooltips, double-check before delete action etc) light-boxes or open-in-browser option for images, and expansion of the user profile to allow image upload to avatar. 

I also aim to better integrate filtering and/or search functions to allow saving and searching for inspiration items and pages by ID and parameters (e.g. quote, author of quote, image category, writer of page etc).

I would like to extend user interactions to include messages, and allow users to upload their own images and text for the inspiration items. This involves more complexity and consideration of issues beyond the tech-stack, such as moderation, user privacy and standard of care owed by the app developer, so it is likely to be a long term goal.

**Install instructions**

PREREQUISITES

NodeJS v15.11.0
Ruby v2.6.6
Rails
Postgres

SET-UP

Once cloned, start a terminal for both the client (cd capstone-client) and server (cd capstone-server) folders. 

Run the following commands in the terminal for each respectively:

(1) Server
- bundle install (downloads the necessary dependencies from the file 'Gemfile')
- rails db:create (creates the migrate file with parameters for databases and tables based on models in the code)
- rails db:migrate (creates the databases and tables in the database Postgres, based on the migration just created)
- rails db:seed (seeds the user data so you can log-in without registering, though you could also register)
- rails s (to start the server at http://localhost:9000)

(2) Client
- npm install (downloads the necessary dependencies from the file 'package.json')
- npm start (to start the client at http://localhost:3000)

Together this should start the app, with full-stack functionality, in the browser at http://localhost:3000.

Make sure you are logged-in to postgres. You may also wish to download and open your favourite postgres interface, such as Postico, to view the databases and tables directly or use SQL to update and/or query it directly.

___________________________________________________________________________________________________________________________________________________________

