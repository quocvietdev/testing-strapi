'use strict';

/**
 * config-queue service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::config-queue.config-queue');