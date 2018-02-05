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
    
    var displayCreatures = function() {
	console.log("-----------------------");
	for (var i = 0; i < creatures.length; i = i + 1) {
	    console.log(creatures[i].name + " ==> " + creatures[i].ini);
	}
	console.log("-----------------------");
    };
    /* End of Function Section */

    /* Code Section */
    $("#restart").click( function () {
	if( confirm("You'll lost everything.") ) {
	    console.log("Deleting all.");
	}
    });

    $("#new").click( function () {
	if( confirm("You'll lost the current order.") ) {
	    console.log("Sorting all.");
	}

	creatures.sort(isGreater);
	displayCreatures();
    });

    $("#add").click( function () {
	$("#add-box").toggle();
    });

    $("#close-modal").click( function () {
	$("#add-box").hide();
	$("#char-values").text("Click to submit.");
	displayCreatures();
    });

    $("#dice").click( function () {
	$("#ini-dice").val( d20() );
    });

    $("#undo").click( function () {
	var tmp = old.slice();

	old = creatures.slice();
	creatures = tmp.slice();
	
	displayCreatures();
    });

    $("#next").click( function () {
	old = creatures.slice();
	creatures.push(creatures.shift());
	displayCreatures();
    });

    $("#previous").click( function () {
	old = creatures.slice();
	creatures.unshift(creatures.pop());
	displayCreatures();
    });
    
    $("#submit-char").click( function () {
	var name = $("#char-name").val();
	var roll = parseInt( $("#ini-dice").val() );
	var mod = parseInt( $("#ini-mod").val() );
	
	roll = validNum(roll, "Initiative Dice");
	mod = validNum(mod, "Initiative Modifier");

	old = creatures.slice();
	
	creatures.push (	    
	    {
		name: name,
		roll: roll,
		mod: mod,
		ini: roll + mod
	    }
	);

	$("#char-values").text(name + " was submitted with initiative equals to " + (roll + mod) + ".");
	
    });
    
    /* End of Code Section */    
});
