/**
 * Global Configuration for PokéAPI Testing Framework
 */

module.exports = {
  // API Configuration
  api: {
    baseUrl: process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2',
    timeout: process.env.API_TIMEOUT || 10000,
    retries: process.env.API_RETRIES || 3,
    retryDelay: 1000
  },

  // Request Headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'PokéAPI-QA-Automation/1.0'
  },

  // Test Configuration
  test: {
    // Valid test data
    validPokemon: [
      { id: 1, name: 'bulbasaur' },
      { id: 25, name: 'pikachu' },
      { id: 150, name: 'mewtwo' }
    ],
    
    // Invalid test data for negative testing
    invalidPokemon: [
      { id: 99999, name: 'fakepokemon' },
      { id: -1, name: 'invalidid' },
      { id: 0, name: 'zero' }
    ],

    // Ability test data
    abilities: ['static', 'volt-absorb', 'lightning-rod'],
    
    // Item test data
    items: ['master-ball', 'pokeballs', 'potion']
  },

  // Performance Testing Configuration
  performance: {
    maxResponseTime: 2000, // milliseconds
    concurrentRequests: 100,
    testDuration: 60000, // milliseconds (1 minute)
    thinkTime: 500 // milliseconds between requests
  },

  // Reporting Configuration
  reporting: {
    outputDir: './reports',
    junitDir: './reports/junit',
    allureDir: './reports/allure-results',
    failureScreenshots: true,
    captureResponseBody: true
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    logFile: './logs/test.log',
    logApiRequests: true,
    logApiResponses: true
  },

  // Environment-specific settings
  environments: {
    production: {
      baseUrl: 'https://pokeapi.co/api/v2',
      timeout: 10000
    },
    staging: {
      baseUrl: 'https://staging-pokeapi.co/api/v2',
      timeout: 15000
    },
    development: {
      baseUrl: 'http://localhost:3000/api/v2',
      timeout: 20000
    }
  }
};