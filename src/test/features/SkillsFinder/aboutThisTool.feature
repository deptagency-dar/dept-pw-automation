Feature: Verify About This Tool section

  Scenario: Expected About This Tool titles are displayed
    When I click on the About This Tool link
    Then I should see the following titles:
      | How do I fix wrong employee information? |
      | Where is [X] skill? |
      | Keep it Fresh! |
      | Need any help? |
