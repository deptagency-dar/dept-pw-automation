@home
Feature: DEPT
    Scenario: Navigate to DEPT home and validate elements
        Given I go to 'https://dept-central-client-mlbp.vercel.app/'
        Then I can see that the 'title' is displayed
        And I can see that the 'subtitle' is displayed