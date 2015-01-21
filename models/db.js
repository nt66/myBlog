var settings = require('../settings');
var Db = require('mongodb').Db;	//form node_moudles mongodb db.js
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host,Connection.DEFAULT_PORT),{safe:true});