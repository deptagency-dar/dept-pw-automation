@smoke @prod @staging
Feature: DEPT
    Scenario: Navigate to DEPT home
        Given I navigate to 'https://dept-central-client-mlbp.vercel.app/'
        Then I can see that the element 'body' is displayed