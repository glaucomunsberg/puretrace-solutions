# PureTrace – Fictional Company & Model

PureTrace is a fictional company that provides an end-to-end food testing and compliance solution for consumer packaged goods (CPG) brands. In this fictional model, the company operates a laboratory in the United States where brands send product samples for testing to detect heavy metals and other contaminants, ensuring compliance with food safety regulations. Test results are stored in a database, and PureTrace provides visualization tools to help customers better understand their data.

The following problem is a simulation based on the fictional PureTrace model and represents a simplified version of the dashboard within the company’s application.

## Assignment Objective

The purpose of this assignment is to show development skills in the context of Ruby on Rails and React.

  -	No external resources are off-limits for this assignment.

  -	The solution provide best practices and code readability.

  - The solution should be production-ready.

## Requirements

1.	A Rails project connected to a relational database PostgreSQL.

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

5.	Create an “Analytics” React with Typescript.

    The primary element on this page should be a scatter plot visualizing the test results for heavy metals.
    
    Chart axes:

    X-axis: Test date

    Y-axis: Concentration (ppb)

    The page should include a multi-select filter to filter the data by product.

    The multi-select should auto-submit when changed.

6.	Write at least one automated test covering the chart functionality with RSpec.

## Data Model

> [!NOTE]
> The following column definitions assume the use of PostgreSQL.

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

## Important Notice

This assignment and the PureTrace company are entirely fictional, created solely for evaluation and learning purposes.