# PureTrace – Fictional Company & Model

PureTrace is a fictional company that provides an end-to-end food testing and compliance solution for consumer packaged goods (CPG) brands. In this fictional model, the company operates a laboratory in the United States where brands send product samples for testing to detect heavy metals and other contaminants, ensuring compliance with food safety regulations. Test results are stored in a database, and PureTrace provides visualization tools to help customers better understand their data.

The following problem is a simulation based on the fictional PureTrace model and represents a simplified version of one of the dashboard within the company’s application.

## Assignment Objective

The purpose of this assignment is to assess your full-stack development skills in the context of Ruby on Rails.

  -	No external resources are off-limits for this assignment.

  -	Your solution will be evaluated based on best practices and code readability.

  -	The goal is to complete the assignment within an afternoon.

## Requirements

1.	Create a new Rails project connected to a relational database management system (RDBMS) of your choice.

    The database should be hosted within a Docker container, while the Rails server can run locally.

2.	Build two models: Product and Test.
    
    Their schemas are outlined in the Data Model section.

3.	Seed the database with three example products:
    
    “Baby Food”

    “Protein Powder”

    “Popcorn”

4.	Set up an ActiveJob adapter and create a background job that runs on a cron schedule once every minute.

    This job should create a new Test record.
    
    The product_id should be randomly selected from the available products.
    
    The data field should be populated using the following method:

    ```ruby
    def fake_test_data
      {
        lead_concentration: rand(25),
        mercury_concentration: rand(25),
        arsenic_concentration: rand(25),
        cadmium_concentration: rand(25),
      }
    end
    ```

5.	Create an “Analytics” page.

    The primary element on this page should be a scatter plot visualizing the test results for heavy metals.
    
    Chart axes:

    X-axis: Test date

    Y-axis: Concentration (ppb)

    The page should include a multi-select filter to filter the data by product.

    The multi-select should auto-submit when changed.

    The page may be styled with any CSS framework of your choice.

6.	Write at least one automated test covering the chart functionality.

## Data Model

> [!NOTE]
> The following column definitions assume the use of PostgreSQL but can be adapted for another RDBMS if needed.

```
Product {
  id          bigint not null serial
  name        string not null
  created_at  timestampz
  updated_at  timestampz
}

Test {
  id          bigint not null serial 
  product_id  bigint not null
  data        jsonb
  created_at  timestampz
  updated_at  timestampz
}

```

## Delivery
In README.md file at the root of the repository with the following sections:

1. Introduction
2. Running the project
3. Follow-up Questions

## Follow-Up Questions

These questions are meant to initiate a discussion about your solution and methodology. Please include your responses in the README.md file at the root of the repository.

1.	What hosting service would you choose for this application and why?
2.	If the volume of generated tests increases significantly, what strategies would you consider to maintain good page load performance?

## Important Notice

This assignment and the PureTrace company are entirely fictional, created solely for evaluation and learning purposes.