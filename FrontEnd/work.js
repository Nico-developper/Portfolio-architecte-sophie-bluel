fetch(`http://localhost:5678/api/works`).then(response=>response.json().then(function(w){
    const works =w;
    console.log(works);
}));

fetch(`http://localhost:5678/api/categories`).then(response=>response.json().then(function(c){
    const categories =c;
    console.log(categories);
}));

/*fetch(`http://localhost:5678/api/users/login`).then(response=>response.json().then(function(l){
    const login =l;
    console.log(login);
}));
/*



/****Test avec DAVID********/
/*
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json(); 


const test = document.getElementById("test"); 
for (let i = 0; i < works.length; i++) {
    test.innerHTML += `${works[i].title}: ${works[i].id} <br>`;
}
*/

/******** Affichage connexion ******/

let login = document.getElementById('login');
let connectdisplay = document.getElementById("loginwindow");
let connectdisplaypage = document.getElementById("page");

login.addEventListener("click", () => {  
    if (getComputedStyle(connectdisplay).display != "none") {
        connectdisplay.style.display = "none";
        connectdisplaypage.style.display = "block"; // Affiche la page
    } else {
        connectdisplay.style.display = "block";
        connectdisplaypage.style.display = "none"; // Cache la page
    }
});

/******** Recuperation form login ******/

const form = document.querySelector('form');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    //*console.log("Il n’y a pas eu de rechargement de page");
        
    let email = document.getElementById("login_email").value;
    let mdp = document.getElementById("login_password").value;

    //*console.log(email);
    //*console.log(mdp);
    
    if (email === "" && mdp ==="") {
        console.log('Les champs email et mdp ne sont pas rempli');

    } else {
        console.log('Le champ email et mdp sont rempli');
    }
});


