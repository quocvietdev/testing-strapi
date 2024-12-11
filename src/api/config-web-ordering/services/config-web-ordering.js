'use strict';

/**
 * config-web-ordering service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-web-ordering.config-web-ordering');