@home
Feature: DEPT
    Scenario: Navigate to DEPT home and validate elements
        Given I go to 'https://dept-central-client-mlbp.vercel.app/'
        Then I can see that the title 'Time Off' is displayed and matches
        Then I can see the subtitle 'It is important to follow the process outlined in the Paid Time Off Policy in order for your vacation to be approved.' is displayed and matches