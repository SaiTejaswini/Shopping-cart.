Shopping Cart.

Front-end app only.
Uses npm for installing grunt and related modules. (refer package.json for all the grunt modules used)
Grunt is the front-end build system. (refer Gruntfile.js for a list of grunt tasks)
Uses bower for dependency management. (refer bower.json for all the bower dependencies)


This app is based on angular and uses angular smart table:
Angular Smart Table : http://lorenzofox3.github.io/smart-table-website/ (For an angular version of html table)

Running the server:

After unzipping, cd into build directory. run

python -m SimpleHTTPServer 8000

From the browser, hit http://localhost:8000. This should launch the app.

App Functionality:
 1. Users can view products and their prices.
 2. User can select Wholesale which allows them to get products on discount.
 3. User can add a product, by clicking on Add To Cart from the list of products.
 4. Users can view number of items in their cart on the top right of the page.
 4. Users can view their cart and total price by clicking on Cart.
 5. Users can modify quantity (increase or decrease) from the cart.
 6. Users can delete products from their cart by clicking delete button next to their product.
 7. Clicking on x (on top right) will take you back to the products list.
