export default {
    //About This Tool Selectors
    aboutThisToolLink: '.SearchQuestion_questionTitle__U3f99',
    aboutThisToolTitles: '.About_importantInfoHeader__3gEbD',
    //Search Selectors
    mainSearchField: '[data-testid="mainSearch"] input',
    primarySkillSearch: '#primarySkill',
    priamrySkillSearchOptions: '#primarySkill-listbox',
    skillLevelSearch: '#skillLevel',
    skillLevelSearchOptions: '[data-value="${level}"]', // level value must be replaced
    additionalSkillSearch: '[data-testid="additionalSkill"] input',
    additionalSkillSearchOptions: '#\\:r3\\:-listbox', // needs review
    communicationSearch: '#communicationFilters',
    communicationSearchOptions: '#communicationFilters-listbox',
    teamSearch: '#team',
    teamSearchOptions: '#team-listbox',
    countrySearch: '#country',
    countrySearchOptions: '#country-listbox',
    departmentSearch: '#department',
    departmentSearchOptions: '#department-listbox',
    clearFiltersButton: '[data-testid="clearFiltersButton"]',
    //Profile Card Selectors
    cardProfileName: '[data-testid="Card_profileName"]',
    cardProfileTitle: '[data-testid="Card_profileTitle"]',
    cardSkillsPanel: '[data-testid="Card_skillsPanelList"]',
    cardSkillWithLevel: '[data-testid*="Card_levelSkillsItem-"]',
    cardProfileDescription: '[data-testid="Card_profileDescription"]',
    //Pagination Selectors
    pageLink: '.ais-Pagination-link',
    selectedPage: '.ais-Pagination-item--selected',
    nextPageLink: '.ais-Pagination-item--nextPage > .ais-Pagination-link',
    previousPageLink: '.ais-Pagination-item--previousPage > .ais-Pagination-link',
    firstPageLink: '.ais-Pagination-item--firstPage > .ais-Pagination-link',
    lastPageLink: '.ais-Pagination-item--lastPage > .ais-Pagination-link',
    //Copy URL Selectors
    copyURLButton: '[data-testid="copyURLButton"]',
    //Profile Selectors
    profilePicture: '[alt="User Portrait"]',
    editProfileButton: '//*[@id="__next"]/main/section/div[1]/button[2]',
    profileViewHeader: '[data-testid="UserProfileHeader"]',
    profileViewSearch: '[data-testid="profileSkillSearch"] input',
    skillsContainer: '[data-testid*="TagInput_skillContainer"]'
}
