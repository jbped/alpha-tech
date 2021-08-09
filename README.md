# Alpha T3ch
![MIT License badge](https://img.shields.io/badge/license-MIT_License-green)


## Description
[Alpha T3ch](https://alpha-t3ch.herokuapp.com/) is a node, express.js, sequelize/mysql blog site. It allows for views to see tech related posts and comments by users. Upon creating an account users are able to add comments and posts for themselves. They are also able to view their historical posts and comments, and the posts and comments of others on their user activity page. Users are able to edit their comments and posts as well. 

![Alpha T3ch homepage](https://user-images.githubusercontent.com/76881086/128782842-2b4c8fe1-0e70-468d-8594-2a6641a24ca7.png)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)
* [Contributions](#contributions)
* [Questions](#questions)

## Installation
These instructions are for hosting the webapp on your local device.
1. Ensure that you are able to create a new SQL Database.
2. Clone repository 
3. Open a new command line that is in the correct directory 
4. Run `npm i `
5. Navigate to the ".env EXAMPLE" file 
6. Edit the DB_USER and DB_PASS values to match your SQL Server credentials. 
7. Rename the ".env EXAMPLE" file to ".env"
8. Return to your open command line, load the schema.sql to create the appropriate database and tables.
    * In MySQL this can be done by:
    * `mysql -u {user} -p`
    * Enter your MySQL password
    * `source ./db/schema.sql;`
9. The application can now be used.

## Usage
Once the application has been installed, or accessed using the [deployed site](https://alpha-t3ch.herokuapp.com/) you can view previous posts, create a new account (or login if you already have created one). User posts and comments can easily be found by clicking on the user handle in the post. To view your personal history click on the Dashboard link in navigation bar. You can create a new post when you are within your dashboard page. To edit a post simply find the post you wish to edit, open the single post page related to that post. Upon accessing the page you will be able to click the edit and delete buttons related to the action you wish to take. Same thing can be done for comments that you have created. Simply access the post that they are on, and press the edit button.

## License

MIT License

Copyright &copy; 2021 Jake Pedigo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits
### Assets
* [Node.js](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [express-session](https://www.npmjs.com/package/express-session)
* [bcrypt](https://www.npmjs.com/package/bcrypt)

## Contributions
Contributions to this project follow the Contributor Covenant [additional information can be found here](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

## Questions
For any inquiries regarding Team Manager, please contact Jake Pedigo:
* GitHub: [jbped](https://github.com/jbped)
* Email: <pedigojacob@gmail.com>
