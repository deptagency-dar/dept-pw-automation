Feature: Verify pagination functionality

  Background:
    Given I search by country "Argentina"

  Scenario: Verify the number of elements per page
    Then I should see 20 cards on the page

  Scenario: Verify pagination navigation
    Given I should be on page 1
    When I click on page 2
    Then I should be on page 2

    When I click on the next page
    Then I should be on page 3

    When I click on the previous page
    Then I should be on page 2

    When I click on the first page
    Then I should be on page 1

    When I click on the last page
    Then I should be on page 3 
    #We might need to replace the hardcoded '3' with the actual last page number obtained from the intercepted network call.
