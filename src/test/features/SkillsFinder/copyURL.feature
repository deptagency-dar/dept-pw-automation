@skillsfinder
Feature: Verify Copy URL button functionality

  Background:
    Given I navigate to 'https://skills-test.deptagency.com/'
    Then Sign in with test user

  Scenario: Generate correct search link
    Given I search by primary skill "Java"
    And I search by country "Argentina"
    When I click the Copy URL button
    And I clear all filters
    Then the clipboard text should contain "Java" and "Argentina"
    