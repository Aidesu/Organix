let index = 0;

function feur() {
    index ++;
}

do {
    console.log(index);
    feur();
} while (index < 3);

console.log("initializing");