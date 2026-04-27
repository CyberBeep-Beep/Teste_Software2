/**
 * PokéAPI - Ability Endpoints Test Suite
 * Tests for GET /ability/{id|name} endpoints
 */

const axios = require('axios');
const { expect } = require('chai');
const config = require('../../config/config');

describe('PokéAPI - Ability Endpoints', function() {
  const baseUrl = config.api.baseUrl;
  const abilities = config.test.abilities;

  this.timeout(config.api.timeout);

  /**
   * Test Suite: GET /ability/{name} - Valid Cases
   */
  describe('GET /ability/{name} - Valid Abilities', function() {
    
    abilities.forEach(ability => {
      it(`Should return ability data for ${ability}`, async function() {
        const response = await axios.get(`${baseUrl}/ability/${ability}`, {
          timeout: config.api.timeout
        });

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id').that.is.a('number');
        expect(response.data).to.have.property('name', ability);
        expect(response.data).to.have.property('effect_entries').that.is.an('array');
        expect(response.data).to.have.property('pokemon').that.is.an('array');
      });
    });
  });

  /**
   * Test Suite: GET /ability - List All Abilities
   */
  describe('GET /ability - List Abilities', function() {
    
    it('Should return paginated list of abilities', async function() {
      const response = await axios.get(`${baseUrl}/ability?limit=10`, {
        timeout: config.api.timeout
      });

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('count').that.is.a('number');
      expect(response.data).to.have.property('results').that.is.an('array');
      expect(response.data.results.length).to.equal(10);
    });
  });

  /**
   * Test Suite: Ability Schema Validation
   */
  describe('Ability Schema Validation', function() {
    
    it('Should validate ability object structure', async function() {
      const response = await axios.get(`${baseUrl}/ability/${abilities[0]}`, {
        timeout: config.api.timeout
      });

      const ability = response.data;

      expect(ability).to.have.property('id').that.is.a('number');
      expect(ability).to.have.property('name').that.is.a('string');
      expect(ability).to.have.property('effect_entries').that.is.an('array');
      
      // Validate effect_entries structure
      if (ability.effect_entries.length > 0) {
        const effect = ability.effect_entries[0];
        expect(effect).to.have.property('effect').that.is.a('string');
        expect(effect).to.have.property('language');
      }
    });
  });

  /**
   * Test Suite: Invalid Ability Requests
   */
  describe('Invalid Ability Requests', function() {
    
    it('Should return 404 for non-existent ability', async function() {
      try {
        await axios.get(`${baseUrl}/ability/nonexistentability`, {
          timeout: config.api.timeout
        });
        throw new Error('Expected 404 error');
      } catch (error) {
        expect(error.response.status).to.equal(404);
      }
    });
  });
});
