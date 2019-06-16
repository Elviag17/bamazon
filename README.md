# Bamazon

Bamazon is a node application where users can select an object to purchase by its ID from a given inventory. After they select a valid option, they can then choose the amount of units they'd like to purchase. If there are enough units, the purchase will be made and a total price will be returned to the user. If there are not enough units, the user will be informed there is not enough inventory. The user can keep making purchases until they no longer desire to or the inventory runs out.  

# Installation

Install the Node.js module **mysql** (https://www.npmjs.com/package/mysql) as well as **inquirer** (https://www.npmjs.com/package/inquirer)
to use the application by running the following commands

```bash
npm install mysql
```
and 

```bash
npm install inquirer
```

# Usage

Completing a successful purchase would look as such

<img width="569" alt="regularPurchase" src="https://user-images.githubusercontent.com/45246988/59558940-dd856100-8fb1-11e9-82f3-e5fabd467805.png">

If the amount of units to purchase selected exceeds amount available, purchase will not go through.

<img width="573" alt="notEnoughInventory" src="https://user-images.githubusercontent.com/45246988/59558950-073e8800-8fb2-11e9-985e-00ffc69c753f.png">


Selecting an invalid object ID will result into an error.

<img width="571" alt="invalidError" src="https://user-images.githubusercontent.com/45246988/59558935-c5addd00-8fb1-11e9-962b-b1cdd9dc6a97.png">
