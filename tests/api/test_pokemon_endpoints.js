/**
 * PokéAPI - Pokémon Endpoints Test Suite
 * Tests for GET /pokemon/{id|name}, GET /pokemon, and related endpoints
 */

const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

describe('PokéAPI - Pokémon Endpoints', function() {
  const baseUrl = config.api.baseUrl;
  const validPokemon = config.test.validPokemon;
  const invalidPokemon = config.test.invalidPokemon;

  // Increase timeout for API calls
  this.timeout(config.api.timeout);

  /**
   * Test Suite: GET /pokemon/{id} - Valid Cases
   */
  describe('GET /pokemon/{id} - Valid Pokémon', function() {
    
    validPokemon.forEach(pokemon => {
      it(`Should return Pokémon with ID ${pokemon.id}`, async function() {
        try {
          const response = await axios.get(`${baseUrl}/pokemon/${pokemon.id}`, {
            timeout: config.api.timeout
          });

          expect(response.status).to.equal(200);
          expect(response.data).to.have.property('id', pokemon.id);
          expect(response.data).to.have.property('name');
          expect(response.data).to.have.property('weight');
          expect(response.data).to.have.property('height');
          expect(response.data).to.have.property('base_experience');
          expect(response.data).to.have.property('abilities');
        } catch (error) {
          throw new Error(`Failed to fetch Pokémon ID ${pokemon.id}: ${error.message}`);
        }
      });
    });
  });

  /**
   * Test Suite: GET /pokemon/{name} - Valid Cases
   */
  describe('GET /pokemon/{name} - Valid Pokémon by Name', function() {
    
    validPokemon.forEach(pokemon => {
      it(`Should return Pokémon named ${pokemon.name}`, async function() {
        try {
          const response = await axios.get(`${baseUrl}/pokemon/${pokemon.name}`, {
            timeout: config.api.timeout
          });

          expect(response.status).to.equal(200);
          expect(response.data).to.have.property('name', pokemon.name);
          expect(response.data).to.have.property('id');
          expect(response.data.sprites).to.be.an('object');
        } catch (error) {
          throw new Error(`Failed to fetch Pokémon name ${pokemon.name}: ${error.message}`);
        }
      });
    });
  });

  /**
   * Test Suite: GET /pokemon/{id} - Invalid Cases (Negative Testing)
   */
  describe('GET /pokemon/{id} - Invalid Pokémon (Negative Tests)', function() {
    
    invalidPokemon.forEach(pokemon => {
      it(`Should return 404 for invalid ID ${pokemon.id}`, async function() {
        try {
          await axios.get(`${baseUrl}/pokemon/${pokemon.id}`, {
            timeout: config.api.timeout
          });
          throw new Error('Expected 404 error but request succeeded');
        } catch (error) {
          expect(error.response.status).to.equal(404);
          expect(error.response.data).to.have.property('detail');
        }
      });
    });
  });

  /**
   * Test Suite: GET /pokemon - Pagination
   */
  describe('GET /pokemon - Pagination Tests', function() {
    
    it('Should return paginated list of Pokémon with default limit', async function() {
      const response = await axios.get(`${baseUrl}/pokemon`, {
        timeout: config.api.timeout
      });

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('count').that.is.a('number');
      expect(response.data).to.have.property('results').that.is.an('array');
      expect(response.data.results.length).to.be.greaterThan(0);
    });

    it('Should respect limit parameter', async function() {
      const limit = 5;
      const response = await axios.get(`${baseUrl}/pokemon?limit=${limit}`, {
        timeout: config.api.timeout
      });

      expect(response.status).to.equal(200);
      expect(response.data.results.length).to.equal(limit);
    });

    it('Should support offset parameter', async function() {
      const response = await axios.get(`${baseUrl}/pokemon?limit=5&offset=10`, {
        timeout: config.api.timeout
      });

      expect(response.status).to.equal(200);
      expect(response.data.results).to.be.an('array');
    });
  });

  /**
   * Test Suite: Response Schema Validation
   */
  describe('Response Schema Validation', function() {
    
    it('Should validate Pokémon object schema', async function() {
      const response = await axios.get(`${baseUrl}/pokemon/1`, {
        timeout: config.api.timeout
      });

      const pokemon = response.data;

      // Validate required fields
      expect(pokemon).to.have.all.keys(
        'abilities',
        'base_experience',
        'forms',
        'game_indices',
        'height',
        'held_items',
        'id',
        'is_main_series',
        'location_area_encounters',
        'moves',
        'name',
        'order',
        'past_abilities',
        'past_types',
        'species',
        'sprites',
        'stats',
        'types',
        'weight'
      );

      // Validate field types
      expect(pokemon.id).to.be.a('number');
      expect(pokemon.name).to.be.a('string');
      expect(pokemon.height).to.be.a('number');
      expect(pokemon.weight).to.be.a('number');
      expect(pokemon.abilities).to.be.an('array');
      expect(pokemon.types).to.be.an('array');
      expect(pokemon.stats).to.be.an('array');
    });
  });

  /**
   * Test Suite: Error Handling
   */
  describe('Error Handling', function() {
    
    it('Should handle malformed requests gracefully', async function() {
      try {
        await axios.get(`${baseUrl}/pokemon/@@@@`, {
          timeout: config.api.timeout
        });
        throw new Error('Expected error for malformed request');
      } catch (error) {
        expect(error.response.status).to.equal(404);
      }
    });

    it('Should timeout on slow responses', async function() {
      try {
        await axios.get(`${baseUrl}/pokemon/1`, {
          timeout: 1 // Very short timeout
        });
      } catch (error) {
        expect(error.code).to.equal('ECONNABORTED');
      }
    });
  });
});
