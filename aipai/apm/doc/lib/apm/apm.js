define(function(require, exports, module) {

    var apm = {
        config : {
            debug : true
        }
    };

    //debug
    var debug = function(){};
    if(typeof console !== 'undefined' && apm.config.debug){
        debug = function(msg){
            console.log(msg);
        }
    }
    apm.debug = debug;

    module.exports = apm;

});
