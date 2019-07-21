var fs = require('fs');
var async = require('async');
var mongoose = require('mongoose');
var schema = require('./schema');
mongoose.Promise = Promise;
class mongodb {
    constructor() {
        this._setup();
    }
    _setup() {
        var self = this;
        self._conncted = false;
        mongoose.connect('mongodb://localhost/ragezombies?authSource=admin', {
            useCreateIndex: true,
            useNewUrlParser: true
        });
        self._db = mongoose.connection;
        self._db.on('error', console.error.bind(console, 'connection error:'));
        self._dbUserModel = mongoose.model('User', schema.user);
        self._dbInventoryModel = mongoose.model('Inventory', schema.inventory);
        self._dbBuildingModel = mongoose.model('Buildings', schema.buildings);
        self._dbVehicleModel = mongoose.model('Vehicles', schema.vehicles);
        self._dbCropModel = mongoose.model('Crops', schema.crops);

        self._db.once('open', function() {
            self._conncted = true;
            console.log("- MongoDB Instance successfully initialized");
            require("./mongodb_warmup.js")
        });
    }
    getUserModel() {
        return this._dbUserModel;
    }
    getInventoryModel() {
        return this._dbInventoryModel;
    }
    getBuildingModel() {
        return this._dbBuildingModel;
    }
    getVehicleModel() {
        return this._dbVehicleModel;
    }
    getCropModel() {
        return this._dbCropModel;
    }
}
module.exports = new mongodb();
