// Select the flower element
var flower = document.querySelector('.flower');

// Select the range element
var range = document.querySelector('.range');

// Select the toggleAnimation button
var toggleButton = document.getElementById('toggleAnimation');

// Define constants for the flower creation
var maxParts = 25;
var maxPetalsDef = 6;
var maxPetals = maxPetalsDef;
var partsFontStepDef = 25 / maxParts;
var partsFontStep = partsFontStepDef;
var huetStep = 150 / maxParts;

// Add a click event listener to the toggleAnimation button
toggleButton.addEventListener('click', toggleAnimation);

// Add a mousemove event listener to the document
const mouseEvent = document.documentElement;
mouseEvent.addEventListener('mousemove', (e) => {
    // Update CSS variables --x and --y with the current mouse position
    mouseEvent.style.setProperty('--x', e.clientX + 'px');
    mouseEvent.style.setProperty('--y', e.clientY + 'px');
}); 

// Define the toggleAnimation function
function toggleAnimation() {
    // Toggle the 'paused' class on the flower element
    flower.classList.toggle('paused');
}

// Define the createFlower function
function createFlower () {
    // Calculate the angle between each petal
    var angle = 360 / maxPetals;
    
    // Create each petal
    for (var i = 0; i < maxPetals; i++) {
        var petal = createPetal(); 
        var currAngle = angle * i + 'deg';
        var transform = 'transform: rotateY(' + currAngle + ') rotateX(-30deg) translateZ(9vmin)';
        
        // Set the transform style on the petal
        petal.setAttribute( 'style',transform);
        
        // Add the petal to the flower
        flower.appendChild( petal );
    }
}

// Define the createPetal function
function createPetal () {
    // Create the initial box
    var box = createBox ( null, 0);
    
    // Create the petal element
    var petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Create each part of the petal
    for (var i = 1; i <= maxParts; i++) {
        newBox = createBox ( box, i );        
        box = newBox;
    } 
    
    // Add the box to the petal
    petal.appendChild( box );

    return petal;
}

// Define the createBox function
function createBox ( box, pos ) {
    // Calculate the font size and brightness based on the position
    var fontSize = partsFontStep * ( maxParts - pos ) + 'vmin';
    var half = maxParts / 2;
    var bright = '50';
    if ( pos < half + 1 ) {
        fontSize = partsFontStep * pos + 'vmin';
    }
    else {
        bright = 10 + 40 / half * ( maxParts - pos );
    }
    
    // Calculate the color
    var color = 'hsl(' + huetStep * pos + ', 100%, ' + bright + '%)';
    
    // Create the shape element
    var newShape = document.createElement('div');
    newShape.classList.add( 'shape' );

    // Create the box element
    var newBox = document.createElement('div');
    newBox.classList.add('box');  
    
    // Set the color and font size styles on the box
    var boxStyle = [
        'color: ' + color,
        'font-size: ' + fontSize
    ].join(';');
    newBox.setAttribute('style', boxStyle);

    // Add the old box to the new box, if it exists
    if ( box ) {
        newBox.appendChild( box );
    }
    
    // Add the shape to the new box
    newBox.appendChild( newShape );

    return newBox;
}

// Create the flower
createFlower ();
