const urlApi = "http://localhost:5678"

/********** Affichage connexion **********************************************************************/
let login = document.getElementById('login');
let connectdisplay = document.getElementById("login_Window");
let connectdisplaypage = document.getElementById("page");

login.addEventListener("click", () => {  
    if (getComputedStyle(connectdisplay).display != "none") {
        connectdisplay.style.display = "none";
        connectdisplaypage.style.display = "block";
    } else {
        connectdisplay.style.display = "block";
        connectdisplaypage.style.display = "none";
    }
});

/********** Authentification Login *******************************************************************/
document.addEventListener("DOMContentLoaded", () => {
const loginForm = document.getElementById("login_form");
    if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

const email = document.getElementById("login_email").value;
const password = document.getElementById("login_password").value;

    try {
const response = await fetch(urlApi+"/api/users/login", {
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

        window.location.href = "/index.html";
    } else {
        // Afficher une erreur
        document.getElementById("login_error").style.display = "block";
    }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        document.getElementById("login_error").style.display = "block";
    }
    });

const authLink = document.getElementById("login");
const token = localStorage.getItem("token");

    if (authLink) {
        if (token) {
    // L'utilisateur est connecté : on affiche "logout"
    authLink.textContent = "logout";
    authLink.href = "#";

    authLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "index.html";
        });
    }}
}});

/********** Création des filtres par catégories ******************************************************/
async function affichageFlitres() {
    let listeCategories = await fetch("http://localhost:5678/api/categories");
    listeCategories = await listeCategories.json();
    //console.log(listeCategories);

    const a = document.querySelector(".filter_Bar");

    let content = `<div><a><button data-id="all">Tous</button></a></div>`;

    listeCategories.map(categ => {
        content += `<div><a><button data-id="${categ.id}">${categ.name}</button></a></div>`;
    });

    a.innerHTML = content;

    // Activation des filtres
    const boutons = document.querySelectorAll(".filter_Bar button");
    boutons.forEach(bouton => {
    bouton.addEventListener("click", (e) => {
        e.preventDefault();
        boutons.forEach(b => b.classList.remove("active"));
        bouton.classList.add("active");
        affichageProjets(bouton.dataset.id);
        });
    });
}

/********** Affichage des projets ********************************************************************/
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

/********** Une fois connecter en admin, gestion des projets et fenêtre Modale ***********************/
document.addEventListener("DOMContentLoaded", () => {
    const modifGallery = document.querySelector(".link_Modif_Gallery");
    const filtres = document.querySelector(".filter_Bar");
    const token = localStorage.getItem("token");

    if (token) {
        modifGallery.style.display = "flex";
        filtres.style.display = "none";
    } else {
        modifGallery.style.display = "none";
        filtres.style.display = "flex";
    }
});


/********** Fenêtre Modale ***************************************************************************/
function openModal() {
    document.getElementById("modale_Cover").classList.remove("modale_Hidden");
}

function closeModal() {
    document.getElementById("modale_Cover").classList.add("modale_Hidden");
    const page2_Modale = document.getElementById("page2_Modale");
}

    // Clic sur le bouton de fermeture
    document.querySelector(".close_Modale").addEventListener("click", closeModal);

    // Fermer en cliquant en dehors
    document.getElementById("modale_Cover").addEventListener("click", (e) => {
        if (e.target.id === "modale_Cover") {
        closeModal();
    }
});

document.querySelector(".link_Modif_Gallery").addEventListener("click", openModal);


/********** Affichage des projets dans la modale *****************************************************/
async function affichageProjetsModale(categoryId = null) {
    let listeTravaux = await fetch("http://localhost:5678/api/works");
    listeTravaux = await listeTravaux.json();

    if (categoryId !== null && categoryId !== "all") {
        listeTravaux = listeTravaux.filter(work => work.categoryId === parseInt(categoryId));
    }

    const projets = document.querySelector(".gallery_Modale");
    let content = "";

    listeTravaux.forEach(a => {
        content += `
            <figure data-id="${a.id}" class="projet_Modale">
                <img src="${a.imageUrl}" alt="${a.title}">
                <div class="icon_Delete" data-id="${a.id}" title="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
                       <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
                    </svg>
                </div>
            </figure>`;
});

    projets.innerHTML = content;

document.querySelectorAll(".icon_Delete").forEach(icon => {
    icon.addEventListener("click", handleDeleteProject);
});

document.getElementById("modale_Form").addEventListener("click", afficherFormulaireAjout);
};

/********** Supprimer des projets dans la modale *****************************************************/
async function handleDeleteProject(e) {
    const projectId = e.currentTarget.dataset.id;
    const token = localStorage.getItem("token");

    if (!projectId) {
        console.error("ID du projet non défini.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "*/*"
            }
        });

        if (response.ok) {
            const projectElement = document.querySelector(`figure[data-id="${projectId}"]`);
            if (projectElement) projectElement.remove();

            // Recharger la galerie pour mise à jour
            affichageProjetsModale();
            affichageProjets();
        } else {
            console.error(`Erreur API : ${response.status}`);
            alert("Échec de la suppression du projet. Vérifiez vos droits.");
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Une erreur réseau est survenue.");
    }
}


/********** Affichage dynamique du formulaire d'ajout ***********************************************/
function afficherFormulaireAjout() {
    const addProjectContent = document.getElementById("modale_Add_Projects");
    const page1_Modale = document.getElementById("page1_Modale")

    page1_Modale.style.display = "none"
    addProjectContent.style.display = "flex";
    addProjectContent.style.flexDirection = "column";
    addProjectContent.style.alignItems = "center";

    // Gestion du bouton retour
    const backBtn = document.getElementById("back_Gallery");
    backBtn.addEventListener("click", () => {
    // Revenir à la page 1 de la modale
        document.getElementById("modale_Add_Projects").style.display = "none";
        document.getElementById("page1_Modale").style.display = "block";
    });
}
    // Gestion de la soumission
    const valider = document.getElementById("valider");
    if (valider) {
        valider.addEventListener("submit", handleAjoutProjet);  
};

/********** Prévisualisation de l'image ***********************************************/
const fileTypes = ["image/jpeg", "image/png", "image/jpg"];
const token = localStorage.getItem("token");
const apiUrl = "http://localhost:5678/api/works";

document.getElementById("photo")?.addEventListener("change", function () {
    const previewContainer = document.querySelector(".carreAjout");
    const file = this.files[0];

    // Supprimer les anciennes prévisualisations
    previewContainer.querySelectorAll("img.preview").forEach(el => el.remove());

    if (!file) return;

    if (!fileTypes.includes(file.type)) {
        alert("Format non valide. JPG et PNG uniquement.");
        return;
    }

    const img = document.createElement("img");
    img.classList.add("preview");
    img.src = URL.createObjectURL(file);
    img.style.maxHeight = "100%";

    const croixContainer = document.createElement("div");
   croixContainer.classList.add("croix_Contenaire");
   croixContainer.innerHTML = `
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17.6546 8.05106C18.1235 7.58214 18.1235 6.82061 17.6546 6.35169C17.1856 5.88277 16.4241 5.88277 15.9552 6.35169L12.005 10.3056L8.05106 6.35544C7.58214 5.88652 6.82061 5.88652 6.35169 6.35544C5.88277 6.82436 5.88277 7.58589 6.35169 8.05481L10.3056 12.005L6.35544 15.9589C5.88652 16.4279 5.88652 17.1894 6.35544 17.6583C6.82436 18.1272 7.58589 18.1272 8.05481 17.6583L12.005 13.7044L15.9589 17.6546C16.4279 18.1235 17.1894 18.1235 17.6583 17.6546C18.1272 17.1856 18.1272 16.4241 17.6583 15.9552L13.7044 12.005L17.6546 8.05106Z" fill="black"/>
    </svg>`;

    previewContainer.appendChild(img);
    previewContainer.appendChild(croixContainer);
    document.getElementById("texte_preview").style.display = "none";

    croixContainer.addEventListener("click", () => {
    document.getElementById("texte_preview").style.display = "block";
    img.remove();
    croixContainer.style.display ="none";
//    document.getElementById("photo").value = "";
    })
});

document.getElementById("page2_Modale")?.addEventListener("submit", handleAjoutProjet);


/********** Ajouter un projet dans la modale *****************************************************/

async function handleAjoutProjet(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const form = e.target;

    const photo = document.getElementById("photo").files[0];
    const title = document.getElementById("titre").value.trim();
    const category = document.getElementById("category").value;

    if (!photo || !title || !category) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const fileTypes = ["image/jpeg", "image/png"];
    if (!fileTypes.includes(photo.type)) {
        alert("Image invalide (seuls JPG et PNG sont acceptés).");
        return;
    }

    const formData = new FormData();
    formData.append("image", photo);
    formData.append("title", title);
    formData.append("category", category);

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            form.reset();
            document.querySelectorAll("img.preview").forEach(el => el.remove());
            
            const valider = document.getElementById("valider");
            valider.addEventListener("click", () => {
            document.getElementById("modale_Add_Projects").style.display = "none";
            document.getElementById("page1_Modale").style.display = "block";
        })
            affichageProjetsModale();
            affichageProjets();
        } else {
            console.error("Erreur API :", response.status);
            alert("Échec de l'ajout. Vérifiez vos données ou votre session.");
        }

    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Une erreur est survenue.");
    }
}

/********** Appel des fonctions *********************************************************************/

affichageFlitres();
affichageProjets();
affichageProjetsModale();





























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
*/
    
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

affichageFiltresDOM();
*/



