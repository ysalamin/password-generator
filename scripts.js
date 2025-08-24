const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
    "/"];
    
var slider = document.getElementById("myRange")
var passLength = document.getElementById("length-output")
    
slider.addEventListener('input', function() {
    passLength.textContent = this.value;
})

function GeneratePasswords() {
    pass1 = ""
    pass2 = ""
    for (let i = 0; i < passLength; i +=1 ) {
        let char1 = characters[Math.floor(Math.random()* characters.length)]
        let char2 = characters[Math.floor(Math.random()* characters.length)]
        pass1 += char1
        pass2 += char2
    }

    pass1El = document.getElementById("pass1-el")
    pass2El = document.getElementById("pass2-el")
    
    pass1El.textContent = pass1
    pass2El.textContent = pass2
}

function copyOnClick(id) {

    let element = document.getElementById(id)

    let text = element.textContent

    navigator.clipboard.writeText(text)

    alert("Copied the text: " + text)
}
