# QA Automation Testing Framework for PokéAPI

## Project Structure
This project aims to create a comprehensive QA automation testing framework for PokéAPI. Below is the initial directory structure and configuration files required to set up the framework.

### Directory Structure
```
Teste_Software2/
├── README.md
├── package.json
├── config/
│   ├── config.js
│   └── test.config.js
├── tests/
│   ├── api/
│   │   ├── test_get_pokemon.js
│   │   └── test_get_ability.js
│   └── performance/
│       ├── performance_tests.js
│       └── test_results/
└── reports/
    ├── junit/
    └── allure/
```

## README.md
The README file provides an overview and instructions for the project.

## package.json
This will include the dependencies required for automation testing.

## config/config.js
Configuration file where the endpoints, timeouts, and other testing configurations are defined.

## config/test.config.js
This file can contain configurations for different environments (development, staging, production).

## tests/
This directory will hold all tests, organized by type (API and performance).

## reports/
This directory will store test reports generated after the tests are executed.

## Sample test file structure
- **test_get_pokemon.js:** Test valid and invalid requests for getting Pokémon data.
- **performance_tests.js:** Tests for performance metrics like response time under load.

### Dependencies to be added:
- Mocha for structuring tests
- Chai for assertions
- Axios for API requests
- New Relic or similar for performance tracking

---

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables as required.
4. Execute tests using `npm test`.

---

This framework aims to ensure quality assurance through rigorous API and performance testing.