@skillsfinder
Feature: Verify Edit My Skills functionalities
    Background:
      Given I navigate to 'https://skills-test.deptagency.com/'
      Then Sign in with test user

  Scenario: Search for skills in the personal profile view
    When I click the "Edit My Skills" button
    And I click the "Edit Profile" button
    And I search skill "Python" on profile view
    Then I should see "Python" in the search results

  Scenario: Navigate from profile picture entrypoint and manage editing status
    When I click on the profile picture
    Then the edit mode should be disabled

    When I click the "Edit Profile" button
    Then the edit mode should be enabled

    When I click the "Edit Profile" button
    Then the edit mode should be disabled
