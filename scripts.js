// --- GLOBAL CONSTANTS ---

// Define the available character sets, separated for clarity.
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
const numbers = "0123456789".split('');
const symbols = "~`!@#$%^&*()_-+={[}]|:;<>./?".split('');

// Select the DOM elements we interact with often.
const slider = document.getElementById("myRange");
const passLength = document.getElementById("length-output");

// --- EVENT LISTENER FOR THE SLIDER ---

// Update the password length display in real-time as the slider is moved.
slider.addEventListener('input', function() {
    // 'this.value' gets the current value of the slider.
    passLength.textContent = this.value;
});

// --- HELPING FUNCTION FOR SECURITY ---

/**
 * Generate a secure random index using crypto
 * @param {number} arrayLength The length of the array
 * @return {number} A secure random index from 0 to arrayLength - 1 
 */
function getSecureRandomIdx(arrayLength) {
    // Recipient of the randomness
    let arrayToFill = new Uint32Array(1)

    // Fill with randomness
    window.crypto.getRandomValues(arrayToFill)

    // Shrink to the array sizes
    arrayToFill[0] = arrayToFill[0] % arrayLength;

    return arrayToFill[0]
}

// --- MAIN GENERATION FUNCTION ---

function GeneratePasswords() {
    // Initialize the strings that will hold the generated passwords.
    let pass1 = "";
    let pass2 = "";

    // Get the checkbox elements each time the function is called.
    const numbersInput = document.getElementById("numbers-checkbox");
    const charactersInput = document.getElementById("characters-checkbox");

    // Read the current state (true/false) of the checkboxes.
    const numbersIsChecked = numbersInput.checked;
    const charactersIsChecked = charactersInput.checked;

    // --- BUILD THE ALLOWED CHARACTER SET ---
    
    // Start with a copy of the letters array (always included).
    let allowedChars = [...letters];
    
    // If the "numbers" option is checked, add the numbers to the array.
    if (numbersIsChecked) {
        allowedChars = allowedChars.concat(numbers);
    }
    
    // If the "characters" option is checked, add the symbols as well.
    if (charactersIsChecked) {
        allowedChars = allowedChars.concat(symbols);
    }

    // --- PASSWORD GENERATION LOOP ---
    
    // Loop as many times as the length chosen by the user.
    for (let i = 0; i < passLength.textContent; i++) {
        // For each password, choose a random character from the allowed character set.
        let char1 = allowedChars[getSecureRandomIdx(allowedChars.length)];
        let char2 = allowedChars[getSecureRandomIdx(allowedChars.length)];
        
        // Concatenate (add) the new character to the password string.
        pass1 += char1;
        pass2 += char2;
    }

    // --- UPDATE THE DISPLAY ---
    
    // Select the <p> elements where the passwords will be displayed.
    const pass1El = document.getElementById("pass1-el");
    const pass2El = document.getElementById("pass2-el");
    
    // Update the text content of the elements with the newly generated passwords.
    pass1El.textContent = pass1;
    pass2El.textContent = pass2;
}

// --- COPY TO CLIPBOARD FUNCTION ---

function copyOnClick(id) {
    // Get the DOM element corresponding to the provided ID.
    const element = document.getElementById(id);

    // Get the text content from that element.
    const text = element.textContent;

    // Use the browser's Clipboard API to write the text to the clipboard.
    navigator.clipboard.writeText(text);

    // Display an alert to confirm that the text has been copied.
    alert("Copied the text: " + text);
}