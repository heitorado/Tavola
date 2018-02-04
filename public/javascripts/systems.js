class RpgSystem  {   
    constructor(systemName) {
	this.name = systemName;
    }
    
    display () {
	return "Hello, world!" + " Using games mechanics for: " + this.name + ".";
    }  
};
