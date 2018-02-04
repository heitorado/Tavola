$(document).ready( function() {

    var socket = io();
    var rpgSystem = new RpgSystem( $('input[name=system-choice]:checked', '#system').val() );

    var displaySheet = function () {};

    console.log("Tavola sheet manager started!");
    console.log( rpgSystem.display() );

    $("#system").change( function() {
	
	console.log("Form changed: " + $('input[name=system-choice]:checked', '#system').val());
	displaySheet();
    });

    
    

    /* 	 $('<li><button id="send-sheet" type="submit" class="btn btn-default navbar-btn">Save!</button></li>').insertAfter("#creation");*/

});
