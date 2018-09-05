
function hideElement(element) {
    element.style.display = 'none';
}

function calculateChange() {

    var amountReceived = parseFloat(document.getElementById("amount-received").value);
    var amountDue = parseFloat(document.getElementById("amount-due").value);
    //if (isNaN(amountReceived)) amountReceived = 0;
    var changeNeeded = parseFloat((amountDue - amountReceived).toFixed(2));

    var helpText = document.getElementById('help-text');
    var facePalm = document.getElementById("face-palm");
    var okHand = document.getElementById("ok-hand");
    var thinkFace = document.getElementById("think-face");

    var changeNeededText = document.getElementById("change-needed-text")
    // document.getElementById("help-text").style.backgroundColor = "transparent";

    hideElement(facePalm);
    hideElement(okHand);
    hideElement(thinkFace);


    if (isNaN(changeNeeded)) {
        changeNeededText.innerHTML = "Please enter a valid number!";
        facePalm.style.display = "inline";
    } else if (changeNeeded < 0) {
        changeNeededText.innerHTML = "Change needed: <strong>$" + Math.abs(changeNeeded).toFixed(2) + "</strong>";
        okHand.style.display = "inline";
    } else {
        changeNeededText.innerHTML = "Customer still owes: <strong>$" + changeNeeded.toFixed(2) + "</strong>";
        thinkFace.style.display = "inline";
    }

    changeNeeded = parseFloat(Math.abs(changeNeeded).toFixed(2)); //changeNeeded will be negative
    let dollars = Math.floor(changeNeeded);
    let cents = Math.round((changeNeeded - Math.floor(changeNeeded)) * 100);

    if (cents || dollars > 0) {
        console.log(cents)
        var quarters = cents / 25;
        cents = cents % 25;

        var dimes = cents / 10;
        cents = cents % 10;

        var nickels = cents / 5;
        cents = cents % 5;

        var pennies = cents;

        var changeArray = [
            { output: 'dollars', amount: Math.floor(dollars) },
            { output: 'quarters', amount: Math.floor(quarters) },
            { output: 'dimes', amount: Math.floor(dimes) },
            { output: 'nickels', amount: Math.floor(nickels) },
            { output: 'pennies', amount: Math.floor(pennies) }
        ];

        changeArray.forEach(function (change) {
            document.getElementById(change.output + '-output').innerHTML = "";
            document.getElementById(change.output + '-output').style.display = "none";
            
            if (change.amount !== 0) {
                document.getElementById(change.output + '-output').innerHTML = "<p>" + change.amount + " " + change.output + "</p>";
                document.getElementById(change.output + '-output').style.display = "inline-block";
            }
            
        });

        // instead of this: document.getElementById("dollars-output").innerHTML = dollars + " Dollar bills";
    }
}

document.getElementById("calculate-change").onclick = calculateChange;

document.getElementById("island-mode").onclick = islandMode;

function islandMode(){ //for funsies but not yet implemented
    
    document.querySelectorAll("*").forEach(function(tag){
        if (tag === "dollars-output") {
            tag.innerHTML = "sand dollars";
        }
    });
    //use querySelectorAll to change innerHTML values
}
