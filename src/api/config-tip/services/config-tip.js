'use strict';

/**
 * config-tip service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-tip.config-tip');