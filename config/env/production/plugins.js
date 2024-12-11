module.exports = ({ env }) => ({
   'transformer': {
      enabled: true,
      config: {
        responseTransforms: {
          removeAttributesKey: true,
          removeDataKey: true,
        },
        requestTransforms : {
          wrapBodyWithDataKey: true
        },
        hooks: {
          preResponseTransform : (ctx) => console.log('hello from the preResponseTransform hook!'),
          postResponseTransform : (ctx) => console.log('hello from the postResponseTransform hook!')
        },
    
      }
    },
    'publisher': {
      enabled: true,
      config: {
        hooks: {
          beforePublish: async ({ strapi, uid, entity }) => {
            console.log('beforePublish');
          },
          afterPublish: async ({ strapi, uid, entity }) => {
            console.log('afterPublish');
          },
          beforeUnpublish: async ({ strapi, uid, entity }) => {
            console.log('beforeUnpublish');
          },
          afterUnpublish: async ({ strapi, uid, entity }) => {
            console.log('afterUnpublish');
          },
        },
      },
    },
    // ..
  });