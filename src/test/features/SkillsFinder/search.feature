@skillsfinder
Feature: Verify search functionality using different fields
  Background:
    Given I navigate to 'https://skills-test.deptagency.com/'
    Then Sign in with test user

  Scenario: Search by employer name using the main search field
    Given I search on the main field with "Daniel Schaerer"
    Then I should see "Daniel Schaerer" in the profile name

  Scenario: Search by employer job title using the main search field
    Given I search on the main field with "QA Engineer"
    Then I should see "QA Engineer" in the profile title

  Scenario: Search by skill
    Given I search by primary skill "Cypress"
    Then I should see "Cypress" in the skills panel

  Scenario: Search by skill and level
    Given I search by primary skill "Java"
    And I select skill level "Expert"
    Then I should see "Java" with level "3" in the skills panel

  Scenario: Search by skill and additional skill
    Given I search by primary skill "Java"
    And I add an additional skill "Python"
    Then I should see "Java" in the skills panel
    And I should see "Python" in the skills panel

  Scenario: Search by communication language
    Given I search by communication language "Spanish"
    Then I should see "Spanish" in the communication panel

  Scenario: Search by team
    Given I search by team "DAR"
    Then I should see "DAR" in the profile description

  Scenario: Search by country
    Given I search by country "Argentina"
    Then I should see "Argentina" in the profile description

  Scenario: Search by department
    Given I search by department "Engineering"
    Then I should see "Engineering" in the profile description

  Scenario: Clear filters
    Given I search on the main field with "Daniel Schaerer"
    And I search by primary skill "Cypress"
    And I search by primary skill "Java"
    And I select skill level "Expert"
    And I add an additional skill "Python"
    And I search by communication language "English"
    And I search by team "DAR"
    And I search by country "Argentina"
    And I search by department "QA"
    When I clear all filters
    Then I should see all filters are empty

  Scenario: Navigate to the expected employer's profile when clicking a card
    Given I search on the main field with "Daniel Schaerer"
    When I click on the first profile card with name "Daniel Schaerer"
    Then I should see "Daniel Schaerer" in the profile view header
    