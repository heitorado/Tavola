$( document ).ready( function () {

    /*
     * Contents
     * Variable Section
     * Function Section
     * Code Section
     */

    /* Variable Section */
    var socket = io();
    var mechanics = "";
    var creatures = [];
    var old = creatures;
    var itemID = "ini-item";
    var saved = [];
    /* End of Variable Section */


    /* Function Section */
    var validNum = function (value, name) {
    if ( isNaN(value) ) {
        console.log(name + " isn't a number: " + value);
        value = 0;
    }

    return value;
    };

    var isGreater = function(a, b) { return b.ini - a.ini; };

    var findWithAttr = function (array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
        return i;
            }
    }
    return -1;
    };

    var addToList = function (id, name, roll, mod, type) {

      var icon;

      if(type === 'player')
        icon = '<i class="fas fa-user"></i>';
      if(type === 'mob')
        icon = '<i class="fab fa-optin-monster"></i>';
      if(type === 'npc')
        icon = '<i class="fas fa-child"></i>';

      $("#ini-list").append('<li id="' + id + '" class="list-group-item">' +
                    '<span class="close remove-char">&times;</span>' +
                      '<div class="container-fluid character-line">' + 
                        '<div class="row">' +
                          '<div class="col-md-4 char-text">' +
                            '<span>' + icon + name + '</span>' +
                          '</div>' +

                          '<div class="col-md-4 char-text">' +
                            '<span>' + 'Initiative: ' + (roll + mod) +' = ' + '<i class="ra ra-dice-six"></i>(' + roll +') + ' + mod + '</span>' +
                          '</div>' +

                          '<div class="col-md-1 bar-icon">' +
                            '<i class="fas fa-cogs"></i></span>' +
                          '</div>' +

                          '<div class="col-md-1 bar-icon">' +
                            '<i class="ra  ra-sword"></i>' +
                          '</div>' +

                          '<div class="col-md-1 arrows">' +
                            '<p><i class="fas fa-angle-up"></i></p>'+
                            '<p><i class="fas fa-angle-down"></i></p>' +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</li>');
    };

    var friendOrFoe = function(){

    }

    var updateList = function() {
    $("#ini-list").empty();
    $(".cur").remove();

    if ( creatures.length >= 0) {
        var name = creatures[0].name;
        var roll = creatures[0].roll;
        var mod = creatures[0].mod;
        var type = creatures[0].type;

        $("#current-box").append('<p id="current" class="cur list-group-item">' + name + ' | Initiative: ' + (roll + mod) +' = ' + '<i class="ra  ra-dice-six"></i>(' + roll +') + ' + mod + '</p>' + '<hr class="cur" />');
    }   
    
    creatures.forEach( function (c) {
        addToList(c.id, c.name, c.roll, c.mod, c.type);
    }); 
    };

    var exchange = function (array, i, j) {
    array[i] = array.splice(j, 1, array[i])[0];
    };
    /* End of Function Section */

    /* Code Section */
    $("#restart").click( function () {
    if( confirm("You'll lost everything.") ) {
        console.log("Deleting all.");
        $("#ini-list").empty();
        creatures = [];
        $(".cur").remove();
    }
    });

    $("#new").click( function () {
    if( confirm("You'll lost the current order.") ) {
        console.log("Sorting all.");

        creatures.sort(isGreater);
        updateList();
    }
    });

    $("#add").click( function () {
    $("#add-box").toggle();
    });

    $("#close-modal").click( function () {
    $("#add-box").hide();
    $("#char-values").text("Click to submit.");
    });

    $("#dice").click( function () {
    $("#ini-dice").val( d20() );
    });

    $("#undo").click( function () {
    var tmp = old.slice();

    old = creatures.slice();
    creatures = tmp.slice();

    updateList();
    });

    $("#next").click( function () {
    old = creatures.slice();
    creatures.push(creatures.shift());

    updateList();
    });

    $("#previous").click( function () {
    old = creatures.slice();
    creatures.unshift(creatures.pop());

    updateList();
    });
    
    $("#submit-char").click( function () {
    var name = $("#char-name").val();
    var roll = parseInt( $("#ini-dice").val() );
    var mod = parseInt( $("#ini-mod").val() );
    var id = name + roll + '-' + mod + ':' + randInt(0, 120);
    var type = ; //zé muda aqui de acordo com checkbox
    //type é uma string que pode ter os valores 'player' 'mob' e 'npc'
    
    roll = validNum(roll, "Initiative Dice");
    mod = validNum(mod, "Initiative Modifier");

    old = creatures.slice();
    
    creatures.push (        
        {
        name: name,
        id: id,
        roll: roll,
        mod: mod,
        ini: roll + mod
        }
    );

    // Adding char to html list
    updateList();
    });

    $("#save").click( function () {
    old = creatures.slice();
    saved = creatures.slice();
    });

    $("#return").click( function () {
    old = creatures.slice();
    creatures = saved.slice();

    updateList();
    });
    
    $("#mechanics").click( function () {
    alert("Not available yet.");
    });
    
    $(document).on("click", ".remove-char", function () {
    old = creatures.slice();
    
    var item = $(this).closest("li");
    
    var index = findWithAttr( creatures, 'id', item.attr("id") );
    creatures.splice(index, 1);

    if(creatures.length === 0) {
        $(".cur").remove();
    }
        
    item.remove();
    });

    $(document).on("click", ".fa-angle-up", function () {
    old = creatures.slice();
    
    var item = $(this).closest("li");

    var index = findWithAttr( creatures, 'id', item.attr("id") );
    exchange(creatures, index, (index - 1) % creatures.length);

    updateList();   
    });  

    $(document).on("click", ".fa-angle-down", function () {
    old = creatures.slice();
    
    var item = $(this).closest("li");

    var index = findWithAttr( creatures, 'id', item.attr("id") );
    exchange(creatures, index, (index + 1) % creatures.length);

    updateList();
    });
    /* End of Code Section */    
});
