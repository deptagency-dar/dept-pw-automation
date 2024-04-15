@smoke @prod @staging
Feature: DEPT
    Scenario: Navigate to DEPT home
        Given I navigate to 'https://www.deptagency.com/'
        Then I can see that the element 'body' is displayed