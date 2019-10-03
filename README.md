# Bamazon Inventory

This will be a Node app that will have 3 seperate applications

## Customer View App

This will show a list of columns which include:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

There will be an assortment of different products for the customer to choose from and purchase the quantity they need.

## Manager View App

This will show a list of menu options for the manager.

  * View Products for Sale (list every available item: the item IDs, names, prices, and quantities)
    
  * View Low Inventory (list all items with an inventory count lower than five)
    
  * Add to Inventory (display a prompt that will let the manager "add more" of any item currently in the store)
    
  * Add New Product (allow the manager to add a completely new product to the store)

## Supervisor View App

This will have a new table of the following:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window.

