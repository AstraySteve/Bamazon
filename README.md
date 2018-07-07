# Bamazon
An MySQL and node.js exercise 

Bamazon is a Command Line Interface App with 3 commands:
- bamazonCustomer.js
    - This app will first display all items avaliable for purchase: id, name and price
    ![IMG1](./images/img1.png)
    - User is presented with 2 questions:
        - enter product ID of the item they wish to buy
        - enter the amount they wish to buy
    - Total cost will be displayed and changes will be updated in the database
    ![IMG2](./images/img2.png)
    - User will get a message if there is insufficient stock
    ![IMG3](./images/img3.png)
- bamazonManager.js
    - This app will provide a list of options
        ![IMG4](./images/img4.png)
        - View Products for Sale will return a similar output as bamazonCustomer with added info such as stock_quantity
        - View Low inventory will return all items with stock less than 5
        ![IMG5](./images/img5.png)
        - Add to inventory will update stock levels
        - Add new product allows user to enter a new row to database

- bamazonSupervisor.js
    - This app will provide 2 options
        ![IMG6](./images/img6.png)
        - View Sales by department will return the following table
        ![IMG7](./images/img7.png)
        - Create new department allows user to enter a new row to database

##### Note: 
- This is a simple app and therefore all commands can be accessed without need for authentication
- This app also assumes correct input

#### Install
1) clone repo and enter npm install in terminal
2) Have a MYSQL server running (MAMP is useful to have)
3) Make sure it is using LocalHost and port 3306 

#### Dependencies
* console.table
    * https://www.npmjs.com/package/console.table
* mysql
    * https://www.npmjs.com/package/mysql
* inquirer
    * https://www.npmjs.com/package/inquirer