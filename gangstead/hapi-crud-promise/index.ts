'use strict';
const _ = require('lodash');

type f = (x:any) => any;

interface t {
    config:any;
    path:any;       
    crudCreate:f|undefined;
    crudRead:f|undefined;
    crudReadAll:f|undefined;    
    crudUpdate:f|undefined;
    crudDelete:f|undefined;
}


module.exports = (server, options:t) => {
  const reallAllPost = options.path.slice(0, options.path.lastIndexOf('/'))

  let baseOpts = _.omit(options, [
    'method',
    'path',
    'handler',
    'crudReadAll',
    'crudCreate',
    'crudRead',
    'crudUpdate',
    'crudDelete'
  ]);

  _.unset(baseOpts, 'config.validate.params');
  _.unset(baseOpts, 'config.validate.payload');
  _.unset(baseOpts, 'config.validate.query');

  server.route(_.merge(baseOpts, {
    method: 'GET',
    path: reallAllPost,
    config: {
      validate: {
        query: options.config.validate.query
      }
    },
    handler: function(req, reply) {
      reply(options.crudReadAll(req));
    }
  }));

  server.route(_.merge(baseOpts, {
    method: 'POST',
    path: reallAllPost,
    config: {
      validate: {
        payload: options.config.validate.payload
      }
    },
    handler: function(req, reply) {
      reply(options.crudCreate(req)).code(201);
    }
  }));

  server.route(_.merge(baseOpts, {
    method: 'GET',
    path: options.path,
    config: {
      validate: {
        params: options.config.validate.params
      }
    },
    handler: function(req, reply) {
      reply(options.crudRead(req));
    }
  }));

  server.route(_.merge(baseOpts, {
    method: 'PUT',
    path: options.path,
    config: {
      validate: {
        params: options.config.validate.params,
        payload: options.config.validate.payload
      }
    },
    handler: function(req, reply) {
      reply(options.crudUpdate(req));
    }
  }));

  server.route(_.merge(baseOpts, {
    method: 'DELETE',
    path: options.path,
    config: {
      validate: {
        params: options.config.validate.params
      }
    },
    handler: function(req, reply) {
      reply(options.crudDelete(req)).code(204);
    }
  }));
}
