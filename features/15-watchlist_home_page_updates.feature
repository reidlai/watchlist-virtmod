@ui @watchlist
Feature: Real-time Watchlist Updates
  As a user
  I want the ticker states to update automatically
  So that I have the most current information without manual refreshing

  Scenario: Ticker price updates in real-time
    Given I am viewing the watchlist with "AAPL" at "150.00"
    When the service emits a new price of "155.00" for "AAPL"
    Then the "Last" column for "AAPL" should update to "155.00"
    And the "Updated" timestamp should reflect the new time

  Scenario: Service error displays toast notification
    Given I am viewing the watchlist
    When the service encounters an error "Network Disconnected"
    Then I should see a toast notification with the message "Network Disconnected"
    And the toast should have role "alert"
    And the toast should be removed automatically after 5 seconds
