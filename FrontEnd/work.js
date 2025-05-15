/**********           Test avec DAVID            ********/

/*const response = await fetch('http://localhost:5678/api/works');
const works = await response.json(); 


const test = document.getElementById("test"); 
for (let i = 0; i < works.length; i++) {
    test.innerHTML += `${works[i].title}: ${works[i].id} <br>`;
}
*/

/**********           Test récupération des donnés de l'API            ********/

/*fetch(`http://localhost:5678/api/works`).then(response=>response.json().then(function(w){
    const works =w;
    console.log(works);
}));

fetch(`http://localhost:5678/api/categories`).then(response=>response.json().then(function(c){
    const categories =c;
    console.log(categories);
}));
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

/******** Test Recuperation form login ******/

/*const form = document.querySelector('form');

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

/**********   Authentification     ********/

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login_form");
    if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page

      const email = document.getElementById("login_email").value;
      const password = document.getElementById("login_password").value;

      try {
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Connexion réussie :", data);

          // Stocker le token et l'ID utilisateur
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);

          // Rediriger vers une page protégée
          window.location.href = "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
        } else {
          // Afficher une erreur
          document.getElementById("login-error").style.display = "block";
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        document.getElementById("login_error").style.display = "block";
      }
    });
  }
});

/**********   Une fois connecter en admin, gestion des projets      ********/



/**********   Création des filtres par catégories     ********/

async function affichageFlitres() {
    let listeCategories = await fetch("http://localhost:5678/api/categories");
    listeCategories = await listeCategories.json();
    //console.log(listeCategories);

    const a = document.querySelector(".filterBar");

    let content = `<div><a><button data-id="all">Tous</button></a></div>`;

    listeCategories.map(categ => {
        content += `<div><a><button data-id="${categ.id}">${categ.name}</button></a></div>`;
    });

    a.innerHTML = content;

    // Activation des filtres
    const boutons = document.querySelectorAll(".filterBar button");
    boutons.forEach(bouton => {
    bouton.addEventListener("click", (e) => {
        e.preventDefault();
        boutons.forEach(b => b.classList.remove("active"));
        bouton.classList.add("active");
        affichageProjets(bouton.dataset.id);
        });
    });
}

affichageFlitres();


/**********   Affichage des projets    ********/

async function affichageProjets(categoryId = null) {
    let listeTravaux = await fetch("http://localhost:5678/api/works");
    listeTravaux = await listeTravaux.json();

    if (categoryId !== null && categoryId !== "all") {
        listeTravaux = listeTravaux.filter(work => work.categoryId === parseInt(categoryId));
    }

    const projets = document.querySelector(".gallery");
    let content = "";

    listeTravaux.forEach(a => {
        content += `
            <figure>
                <img src="${a.imageUrl}" alt="${a.title}">
                <figcaption>${a.title}</figcaption>
            </figure>`;
    });

    projets.innerHTML = content;
};

affichageProjets();














    
/**********   Création des filtres par catégories (version DOM)   ********/

/*async function affichageFiltresDOM() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const categories = await response.json();
        console.log(categories);

        const filterBar = document.querySelector(".filterBar");

        // Ajout du bouton "Tous"
        const boutonTous = document.createElement("button");
        boutonTous.textContent = "Tous";
        boutonTous.dataset.id = "all";
        filterBar.appendChild(boutonTous);

        // Ajout des boutons par catégorie
        categories.forEach(categ => {
            const bouton = document.createElement("button");
            bouton.textContent = categ.name;
            bouton.dataset.id = categ.id;
            filterBar.appendChild(bouton);
        });

        // Activation des filtres
        const boutons = filterBar.querySelectorAll("button");
        boutons.forEach(bouton => {
            bouton.addEventListener("click", () => {
                // Ajoute ou enlève la classe active pour le style
                boutons.forEach(b => b.classList.remove("active"));
                bouton.classList.add("active");

                // Affiche les projets filtrés
                affichageProjets(bouton.dataset.id);
            });
        });

    } catch (error) {
        console.error("Erreur lors de l'affichage des filtres :", error);
    }
}

affichageFiltresDOM();*/




