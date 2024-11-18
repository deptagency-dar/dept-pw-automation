Feature: Verify Copy URL button functionality

  Background:
    Given the browser has clipboard read and write permissions

  Scenario: Generate correct search link
    Given I search by primary skill "Java"
    And I search by country "Argentina"
    When I click the Copy URL button
    And I clear all filters
    Then the clipboard text should contain "Java" and "Argentina"
    