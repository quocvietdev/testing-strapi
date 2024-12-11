'use strict';

/**
 * config-kiosk service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-kiosk.config-kiosk');