import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminWorkflow extends Schema.CollectionType {
  collectionName: 'strapi_workflows';
  info: {
    name: 'Workflow';
    description: '';
    singularName: 'workflow';
    pluralName: 'workflows';
    displayName: 'Workflow';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    stages: Attribute.Relation<
      'admin::workflow',
      'oneToMany',
      'admin::workflow-stage'
    >;
    contentTypes: Attribute.JSON & Attribute.Required & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::workflow',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::workflow',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminWorkflowStage extends Schema.CollectionType {
  collectionName: 'strapi_workflows_stages';
  info: {
    name: 'Workflow Stage';
    description: '';
    singularName: 'workflow-stage';
    pluralName: 'workflow-stages';
    displayName: 'Stages';
  };
  options: {
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String;
    color: Attribute.String & Attribute.DefaultTo<'#4945FF'>;
    workflow: Attribute.Relation<
      'admin::workflow-stage',
      'manyToOne',
      'admin::workflow'
    >;
    permissions: Attribute.Relation<
      'admin::workflow-stage',
      'manyToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::workflow-stage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::workflow-stage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginPublisherAction extends Schema.CollectionType {
  collectionName: 'actions';
  info: {
    singularName: 'action';
    pluralName: 'actions';
    displayName: 'actions';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    executeAt: Attribute.DateTime;
    mode: Attribute.String;
    entityId: Attribute.Integer;
    entitySlug: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::publisher.action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::publisher.action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    name: 'article';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    art_name: Attribute.String;
    artist_name: Attribute.String;
    body: Attribute.RichText;
    photos: Attribute.Media;
    contact_number: Attribute.String;
    email: Attribute.String;
    material: Attribute.String;
    level: Attribute.String;
    price: Attribute.String;
    enquiry: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiCarouselCarousel extends Schema.CollectionType {
  collectionName: 'carousels';
  info: {
    singularName: 'carousel';
    pluralName: 'carousels';
    displayName: 'Carousel';
    name: 'carousel';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    summary: Attribute.Text;
    url: Attribute.String;
    hero_desktop: Attribute.Media;
    hero_mobile: Attribute.Media;
    button: Attribute.Boolean & Attribute.DefaultTo<false>;
    title_button: Attribute.String;
    name: Attribute.String;
    sortOrder: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::carousel.carousel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::carousel.carousel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::carousel.carousel',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::carousel.carousel',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigAboutUsConfigAboutUs extends Schema.SingleType {
  collectionName: 'config_about_uses';
  info: {
    singularName: 'config-about-us';
    pluralName: 'config-about-uses';
    displayName: 'Config-about-us';
    name: 'config-about-us';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    lat_location: Attribute.String;
    long_location: Attribute.String;
    key_google_map: Attribute.String;
    getting_by_bus: Attribute.RichText;
    getting_by_car: Attribute.RichText;
    getting_by_train: Attribute.RichText;
    concierge_services: Attribute.RichText;
    amentities_wifi: Attribute.RichText;
    amentities_nursing_room: Attribute.RichText;
    amentities_charging_point: Attribute.RichText;
    summary: Attribute.Text;
    carpark_charges_car: Attribute.RichText;
    carpark_charges_motorcycle: Attribute.RichText;
    url_hero_banner: Attribute.String;
    hero_banner_desktop: Attribute.Media;
    hero_banner_mobile: Attribute.Media;
    show_banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-about-us.config-about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-about-us.config-about-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-about-us.config-about-us',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-about-us.config-about-us',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigArticleConfigArticle extends Schema.SingleType {
  collectionName: 'config_articles';
  info: {
    singularName: 'config-article';
    pluralName: 'config-articles';
    displayName: 'Config-article';
    name: 'config-article';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    summary: Attribute.RichText;
    url_hero_banner: Attribute.String;
    hero_banner_desktop: Attribute.Media;
    hero_banner_mobile: Attribute.Media;
    show_banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-article.config-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-article.config-article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-article.config-article',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-article.config-article',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigBbFaqConfigBbFaq extends Schema.SingleType {
  collectionName: 'config_bb_faqs';
  info: {
    singularName: 'config-bb-faq';
    pluralName: 'config-bb-faqs';
    displayName: 'Config-bb-faq';
    name: 'config-bb-faq';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    data_faq: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-bb-faq.config-bb-faq',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-bb-faq.config-bb-faq',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-bb-faq.config-bb-faq',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-bb-faq.config-bb-faq',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigCategoryConfigCategory extends Schema.SingleType {
  collectionName: 'config_category_s';
  info: {
    singularName: 'config-category';
    pluralName: 'config-categories';
    displayName: 'Config-category';
    name: 'config-category';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    i12web: Attribute.JSON;
    klikApp: Attribute.JSON;
    heplCenterQR: Attribute.JSON;
    case_type: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-category.config-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-category.config-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-category.config-category',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-category.config-category',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigContactUsConfigContactUs extends Schema.SingleType {
  collectionName: 'config_contact_uses';
  info: {
    singularName: 'config-contact-us';
    pluralName: 'config-contact-uses';
    displayName: 'Config-contact-us';
    name: 'config-contact-us';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    summary: Attribute.RichText;
    mall_address: Attribute.String;
    phone_customer_service: Attribute.String;
    counter_operating_hours: Attribute.RichText;
    reCaptcha_site_key: Attribute.String;
    reCaptcha_secret_key: Attribute.String;
    categories_of_message: Attribute.String;
    url_hero_banner: Attribute.String;
    hero_banner_desktop: Attribute.Media;
    hero_banner_mobile: Attribute.Media;
    show_banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-contact-us.config-contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-contact-us.config-contact-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-contact-us.config-contact-us',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-contact-us.config-contact-us',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigContentFooterConfigContentFooter
  extends Schema.SingleType {
  collectionName: 'config_content_footers';
  info: {
    singularName: 'config-content-footer';
    pluralName: 'config-content-footers';
    displayName: 'Config-content-footer';
    name: 'config-content-footer';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    terms_of_use: Attribute.RichText & Attribute.Required;
    data_protection_statement: Attribute.RichText;
    general_privacy_notice: Attribute.RichText;
    whistleblowing_policy: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-content-footer.config-content-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-content-footer.config-content-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-content-footer.config-content-footer',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-content-footer.config-content-footer',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigFeaturedBistroByteConfigFeaturedBistroByte
  extends Schema.SingleType {
  collectionName: 'config_featured_bistro_bytes_s';
  info: {
    singularName: 'config-featured-bistro-byte';
    pluralName: 'config-featured-bistro-bytes';
    displayName: 'Config-featured-bistro-byte';
    name: 'config-featured-bistro-byte';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    branchID: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-featured-bistro-byte.config-featured-bistro-byte',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-featured-bistro-byte.config-featured-bistro-byte',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-featured-bistro-byte.config-featured-bistro-byte',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-featured-bistro-byte.config-featured-bistro-byte',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigHomepageConfigHomepage extends Schema.SingleType {
  collectionName: 'config_homepages';
  info: {
    singularName: 'config-homepage';
    pluralName: 'config-homepages';
    displayName: 'Config-homepage';
    name: 'config-homepage';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    url_hero_banner: Attribute.String;
    hero_banner_desktop: Attribute.Media;
    hero_banner_mobile: Attribute.Media;
    url_page_facebook: Attribute.String;
    show_banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-homepage.config-homepage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-homepage.config-homepage',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-homepage.config-homepage',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-homepage.config-homepage',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigInstagramConfigInstagram extends Schema.SingleType {
  collectionName: 'config_instagrams';
  info: {
    singularName: 'config-instagram';
    pluralName: 'config-instagrams';
    displayName: 'Config-instagram';
    name: 'config-instagram';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    access_token: Attribute.String;
    id_instagram: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-instagram.config-instagram',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-instagram.config-instagram',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-instagram.config-instagram',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-instagram.config-instagram',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigKioskConfigKiosk extends Schema.SingleType {
  collectionName: 'config_kiosks';
  info: {
    singularName: 'config-kiosk';
    pluralName: 'config-kiosks';
    displayName: 'Config-kiosk';
    name: 'config-kiosk';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    Advertisement: Attribute.Media;
    terms_of_use: Attribute.RichText;
    data_protection_policy: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-kiosk.config-kiosk',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-kiosk.config-kiosk',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-kiosk.config-kiosk',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-kiosk.config-kiosk',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigLockerFaqConfigLockerFaq extends Schema.SingleType {
  collectionName: 'config_locker_faqs';
  info: {
    singularName: 'config-locker-faq';
    pluralName: 'config-locker-faqs';
    displayName: 'Config-locker-faq';
    name: 'config-locker-faq';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    locker_faq: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-locker-faq.config-locker-faq',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-locker-faq.config-locker-faq',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-locker-faq.config-locker-faq',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-locker-faq.config-locker-faq',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigPopupUpdateVersionConfigPopupUpdateVersion
  extends Schema.SingleType {
  collectionName: 'config_popup_update_versions';
  info: {
    singularName: 'config-popup-update-version';
    pluralName: 'config-popup-update-versions';
    displayName: 'Config-popup-update-version';
    name: 'config-popup-update-version';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    Description: Attribute.String;
    isRequired: Attribute.Boolean & Attribute.DefaultTo<false>;
    available_version_ios: Attribute.String;
    available_version_android: Attribute.String;
    old_version_ios: Attribute.JSON;
    old_version_android: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-popup-update-version.config-popup-update-version',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-popup-update-version.config-popup-update-version',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-popup-update-version.config-popup-update-version',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-popup-update-version.config-popup-update-version',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigQueueConfigQueue extends Schema.SingleType {
  collectionName: 'config_queues';
  info: {
    singularName: 'config-queue';
    pluralName: 'config-queues';
    displayName: 'Config-queue';
    name: 'config-queue';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    Advertisement: Attribute.Media;
    promotion_text: Attribute.Text &
      Attribute.Required &
      Attribute.DefaultTo<'[]'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-queue.config-queue',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-queue.config-queue',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-queue.config-queue',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-queue.config-queue',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigRewardConfigReward extends Schema.SingleType {
  collectionName: 'config_rewards';
  info: {
    singularName: 'config-reward';
    pluralName: 'config-rewards';
    displayName: 'Config-reward';
    name: 'config-reward';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    about: Attribute.RichText;
    faq: Attribute.RichText;
    terms: Attribute.RichText;
    hero_desktop: Attribute.Media;
    hero_mobile: Attribute.Media;
    hero_click_url: Attribute.String;
    secondary_click_url: Attribute.String;
    secondary_banner_desktop: Attribute.Media;
    secondary_banner_mobile: Attribute.Media;
    show_secondary_banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    show_banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-reward.config-reward',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-reward.config-reward',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-reward.config-reward',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-reward.config-reward',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigRewardBannerConfigRewardBanner
  extends Schema.SingleType {
  collectionName: 'config_reward_banners';
  info: {
    singularName: 'config-reward-banner';
    pluralName: 'config-reward-banners';
    displayName: 'Config-reward-banner';
    name: 'config-reward-banner';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    voucher_image: Attribute.Media;
    carpark_image: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-reward-banner.config-reward-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-reward-banner.config-reward-banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-reward-banner.config-reward-banner',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-reward-banner.config-reward-banner',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigStoreCategoryConfigStoreCategory
  extends Schema.SingleType {
  collectionName: 'config_store_categories';
  info: {
    singularName: 'config-store-category';
    pluralName: 'config-store-categories';
    displayName: 'Config-store-category';
    name: 'config-store-category';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    Categories: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-store-category.config-store-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-store-category.config-store-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-store-category.config-store-category',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-store-category.config-store-category',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigTipConfigTip extends Schema.SingleType {
  collectionName: 'config_tips';
  info: {
    singularName: 'config-tip';
    pluralName: 'config-tips';
    displayName: 'Config-tip';
    name: 'config-tip';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    tip: Attribute.String;
    url_tip: Attribute.String;
    bistro_byte_tip: Attribute.String;
    url_bistro_byte_tip: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-tip.config-tip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-tip.config-tip',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-tip.config-tip',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-tip.config-tip',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigUrlSocialConfigUrlSocial extends Schema.SingleType {
  collectionName: 'config_url_socials';
  info: {
    singularName: 'config-url-social';
    pluralName: 'config-url-socials';
    displayName: 'Config-url-social';
    name: 'config-url-social';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    instagram: Attribute.String;
    twitter: Attribute.String;
    facebook: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-url-social.config-url-social',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-url-social.config-url-social',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-url-social.config-url-social',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-url-social.config-url-social',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiConfigWebOrderingConfigWebOrdering
  extends Schema.SingleType {
  collectionName: 'config_web_orderings';
  info: {
    singularName: 'config-web-ordering';
    pluralName: 'config-web-orderings';
    displayName: 'Config-web-ordering';
    name: 'config-web-ordering';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    terms: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config-web-ordering.config-web-ordering',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config-web-ordering.config-web-ordering',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::config-web-ordering.config-web-ordering',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::config-web-ordering.config-web-ordering',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiCongfigWhatsonCongfigWhatson extends Schema.SingleType {
  collectionName: 'congfig_whatsons';
  info: {
    singularName: 'congfig-whatson';
    pluralName: 'congfig-whatsons';
    displayName: 'Congfig-whatson';
    name: 'congfig-whatson';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    url_hero_banner: Attribute.String;
    hero_banner_desktop: Attribute.Media;
    hero_banner_mobile: Attribute.Media;
    show_banner: Attribute.Boolean & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::congfig-whatson.congfig-whatson',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::congfig-whatson.congfig-whatson',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::congfig-whatson.congfig-whatson',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::congfig-whatson.congfig-whatson',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiDealDeal extends Schema.CollectionType {
  collectionName: 'deals';
  info: {
    singularName: 'deal';
    pluralName: 'deals';
    displayName: 'Deal';
    name: 'deal';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    summary: Attribute.String;
    publish_start_date: Attribute.DateTime;
    publish_end_date: Attribute.DateTime;
    body: Attribute.RichText;
    show_homepage: Attribute.Boolean & Attribute.DefaultTo<true>;
    youtube_url: Attribute.String;
    photos: Attribute.Media;
    facebook_post_url: Attribute.String;
    time: Attribute.String;
    location: Attribute.String;
    event_date: Attribute.String;
    sort_order: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'0'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::deal.deal', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::deal.deal', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::deal.deal',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::deal.deal',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiEmailEmail extends Schema.CollectionType {
  collectionName: 'emails';
  info: {
    singularName: 'email';
    pluralName: 'emails';
    displayName: 'Email';
    name: 'email';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    contact_number: Attribute.String;
    email: Attribute.Email;
    type_requiry: Attribute.String;
    file_upload_url: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::email.email',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::email.email',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::email.email',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::email.email',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    name: 'event';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    summary: Attribute.Text;
    body: Attribute.RichText;
    publish_start_date: Attribute.DateTime;
    publish_end_date: Attribute.DateTime;
    show_homepage: Attribute.Boolean & Attribute.DefaultTo<true>;
    youtube_url: Attribute.String;
    photos: Attribute.Media;
    facebook_post_url: Attribute.String;
    time: Attribute.String;
    location: Attribute.String;
    event_date: Attribute.String;
    sort_order: Attribute.BigInteger &
      Attribute.Required &
      Attribute.DefaultTo<'0'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiKioskMediaKioskMedia extends Schema.CollectionType {
  collectionName: 'kiosk_medias';
  info: {
    singularName: 'kiosk-media';
    pluralName: 'kiosk-medias';
    displayName: 'Kiosk media';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    images: Attribute.Media;
    videos: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::kiosk-media.kiosk-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::kiosk-media.kiosk-media',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::kiosk-media.kiosk-media',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::kiosk-media.kiosk-media',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiRewardReward extends Schema.CollectionType {
  collectionName: 'rewards';
  info: {
    singularName: 'reward';
    pluralName: 'rewards';
    displayName: 'Reward';
    name: 'reward';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    start_date: Attribute.Date;
    summary: Attribute.Text;
    point: Attribute.BigInteger & Attribute.Required & Attribute.DefaultTo<'0'>;
    end_date: Attribute.Date;
    hero_desktop: Attribute.Media & Attribute.Required;
    hero_mobile: Attribute.Media;
    body: Attribute.RichText;
    photos: Attribute.Media;
    youtube_url: Attribute.String & Attribute.Required;
    show_homepage: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    time: Attribute.String;
    location: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::reward.reward',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::reward.reward',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::reward.reward',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::reward.reward',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface ApiStoreStore extends Schema.CollectionType {
  collectionName: 'stores';
  info: {
    singularName: 'store';
    pluralName: 'stores';
    displayName: 'Store';
    name: 'store';
  };
  options: {
    increments: true;
    timestamps: true;
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    photos: Attribute.Media;
    location: Attribute.String;
    category: Attribute.String;
    website: Attribute.String;
    contact_number: Attribute.String;
    opening_hours: Attribute.String;
    accept_rewards_points: Attribute.Boolean & Attribute.DefaultTo<false>;
    accept_e_voucher: Attribute.Boolean & Attribute.DefaultTo<false>;
    accept_shop_online: Attribute.Boolean & Attribute.DefaultTo<false>;
    body: Attribute.RichText;
    hasPromotion: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    themeConfig: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    strapi_stage: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::workflow-stage'
    >;
    strapi_assignee: Attribute.Relation<
      'api::store.store',
      'oneToOne',
      'admin::user'
    >;
  };
}

export interface AdminAuditLog extends Schema.CollectionType {
  collectionName: 'strapi_audit_logs';
  info: {
    singularName: 'audit-log';
    pluralName: 'audit-logs';
    displayName: 'Audit Log';
  };
  options: {
    draftAndPublish: false;
    timestamps: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    date: Attribute.DateTime & Attribute.Required;
    user: Attribute.Relation<'admin::audit-log', 'oneToOne', 'admin::user'>;
    payload: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::workflow': AdminWorkflow;
      'admin::workflow-stage': AdminWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::publisher.action': PluginPublisherAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::article.article': ApiArticleArticle;
      'api::carousel.carousel': ApiCarouselCarousel;
      'api::config-about-us.config-about-us': ApiConfigAboutUsConfigAboutUs;
      'api::config-article.config-article': ApiConfigArticleConfigArticle;
      'api::config-bb-faq.config-bb-faq': ApiConfigBbFaqConfigBbFaq;
      'api::config-category.config-category': ApiConfigCategoryConfigCategory;
      'api::config-contact-us.config-contact-us': ApiConfigContactUsConfigContactUs;
      'api::config-content-footer.config-content-footer': ApiConfigContentFooterConfigContentFooter;
      'api::config-featured-bistro-byte.config-featured-bistro-byte': ApiConfigFeaturedBistroByteConfigFeaturedBistroByte;
      'api::config-homepage.config-homepage': ApiConfigHomepageConfigHomepage;
      'api::config-instagram.config-instagram': ApiConfigInstagramConfigInstagram;
      'api::config-kiosk.config-kiosk': ApiConfigKioskConfigKiosk;
      'api::config-locker-faq.config-locker-faq': ApiConfigLockerFaqConfigLockerFaq;
      'api::config-popup-update-version.config-popup-update-version': ApiConfigPopupUpdateVersionConfigPopupUpdateVersion;
      'api::config-queue.config-queue': ApiConfigQueueConfigQueue;
      'api::config-reward.config-reward': ApiConfigRewardConfigReward;
      'api::config-reward-banner.config-reward-banner': ApiConfigRewardBannerConfigRewardBanner;
      'api::config-store-category.config-store-category': ApiConfigStoreCategoryConfigStoreCategory;
      'api::config-tip.config-tip': ApiConfigTipConfigTip;
      'api::config-url-social.config-url-social': ApiConfigUrlSocialConfigUrlSocial;
      'api::config-web-ordering.config-web-ordering': ApiConfigWebOrderingConfigWebOrdering;
      'api::congfig-whatson.congfig-whatson': ApiCongfigWhatsonCongfigWhatson;
      'api::deal.deal': ApiDealDeal;
      'api::email.email': ApiEmailEmail;
      'api::event.event': ApiEventEvent;
      'api::kiosk-media.kiosk-media': ApiKioskMediaKioskMedia;
      'api::reward.reward': ApiRewardReward;
      'api::store.store': ApiStoreStore;
      'admin::audit-log': AdminAuditLog;
    }
  }
}
