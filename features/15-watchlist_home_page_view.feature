@ui @watchlist
Feature: View Watchlist Tickers
  As a user
  I want to see a list of my watched tickers on the home page
  So that I can quickly monitor their current state

  Scenario: User visits home page with tracked tickers
    Given I have a watchlist with the following tickers:
      | Symbol | Last   |
      | AAPL   | 150.00 |
      | TSLA   | 200.00 |
      | GOOG   | 2500.00 |
    When I navigate to the home page "/"
    Then I should see a data table containing 3 rows
    And the table should be sorted by "Symbol" in ascending order
    And the first row should contain "AAPL"

  Scenario: User visits home page with empty watchlist
    Given I have an empty watchlist
    When I navigate to the home page "/"
    Then I should see the message "No tickers tracked in your watchlist."
    And the data table should be empty

  Scenario: Mobile user views sticky header
    Given I am on a mobile device
    When I view the watchlist table
    Then the "Symbol" column header should be visible
    And it should be at least 44px high
