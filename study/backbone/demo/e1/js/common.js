define(function(require, exports, module) {

    var Backbone = require('backbone/backbone'),
        $ = require('$');

    var User = Backbone.Model.extend({
        defaults: {
            rule : 'user',
            uid : 0,
            xid : 0,
            time : 0,
            nickname : 'nickname',
            voice : {
                enable : 0
            }
        },
        initialize : function(){
            this.on('change:nickname', function(){
                alert(this.get('nickname'));
            }); 
        }
    }); 

    var user = new User();

    console.debug(user);

});
