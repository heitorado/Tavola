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
    /* End of Variable Section */


    /* Function Section */
    /* End of Function Section */

    /* Code Section */
    $("#new").click( function () {
	if( confirm("You'll lost everything.") ) {
	    console.log("Deleting all.");
	}
    });

    $("#add").click( function () {
	$("#add-box").toggle();
    });

    $("#close-modal").click( function () {
	 $("#add-box").hide();
    });

    $("#add-box").toggle();
    /* End of Code Section */    
});
