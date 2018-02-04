$(document).ready( function() {

    /*
     * Contents
     * Variable Section
     * Function Section
     * Code Section
     */    
    
    /*
     * Variable Section
     */
    var socket = io();
    var listing = true;
    var sheetMan = { // sheet manager, select the correct sheet for a system and display it
	display : function(foo) {
	    
	}
    };
    /*
     * End of Variable Section
     */
    

    /*
     * Function Section
     */
    var content = function () { // display sheet list o sheet creation
	if (listing) {
	    //sheetListing();
	} else {
	    //sheetCreation();
	}
    };
    
    var swap = function () {
	console.log("Swap to listing:" + listing);
	if (listing) {
	    $("#list").removeClass("active");
	    $("#creation").addClass("active");

	    $("#search-bar").remove();
	    $('<li id="send-sheet"><button type="submit" class="btn btn-default navbar-btn">Save!</button></li>').insertAfter("#creation");
	    
	} else {
	    $("#list").addClass("active");
	    $("#creation").removeClass("active");

	    $("#send-sheet").remove();
	    $('<form id="search-bar" class="navbar-form navbar-left">' + 
	      '<div class="form-group">' +
	      '<input type="text" class="form-control" placeholder="Search for a character">' +
	      '</div>' +
	      '<button type="submit" class="btn btn-default">Search</button>' +
	      '</form>').	
		insertAfter("#system-dropdown");
	}
	
	listing = ! listing;
	content();
	
    };
    /*
     * End of Function Section
     */
    

    /*
     * Code Section
     */
    console.log("Tavola sheet manager started!");
    content();   
    
    
    $("#system").change( function() {	
	console.log("Form changed: " + $('input[name=system-choice]:checked', '#system').val());
    });

    $("#creation-a").bind("click", swap );
    $("#list-a").bind("click", swap );
    
    /*
     * End of Code Section
     */
    
    
    
    /* 	 $('<li><button id="send-sheet" type="submit" class="btn btn-default navbar-btn">Save!</button></li>').insertAfter("#creation");*/

});
