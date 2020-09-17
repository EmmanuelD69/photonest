/* INFO IMPORTANTE: CETTE API PERMET D'AFFICHER 200 IMAGES PAR HEURE, PAS PLUS!!! */

/* declaration des variables */
const auth = '563492ad6f917000010000014c3f35f70fb046efb578c7d04441b1d2';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

/* event listeners */
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
	e.preventDefault();
	searchPhotos(searchValue);
});

/* fonction permettant d'enregister la valeur indiquée dans le champ de recherche */
function updateInput(e) {
	searchValue = e.target.value;
}

/* Fonction asyncrhone pour récupérer les données du site Pexels au format json */
async function fetchApi(url) {
	const dataFetch = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: auth,
		},
	});
	/* conversion des données json au format javascript (objet js) */
	const data = await dataFetch.json();
	return data;
}

/* Fonction permettant l'intégration des photos dans la page web */
function generatePictures(data) {
	data.photos.forEach((photo) => {
		/* création d'une div pour chaque photo*/
		const galleryImg = document.createElement('div');
		/* ajout d'une classe pour pouvoir paramétrer le Css des div */
		galleryImg.classList.add('gallery-img');
		/* ajout de la source de la photo et son auteur  */
		galleryImg.innerHTML = `<img src="${photo.src.large}"></img> 
        <p>${photo.photographer}</p>`;
		/* ajout de la div dans l'élément parent gallery */
		gallery.appendChild(galleryImg);
	});
}

/* Fonction asynchrone permettant de récupérer et d'afficher les dernières photos publiées sur le site Pexels */
async function curatedPhotos() {
	const data = await fetchApi('https://api.pexels.com/v1/curated?per_page=15');
	generatePictures(data);
}

/* Fonction asynchrone permettant de récupérer et d'afficher les photos en rapport avec la recherche */
async function searchPhotos(search) {
	clear();
	const data = await fetchApi(
		`https://api.pexels.com/v1/search?query=${search}&per_page=15`
	);
	generatePictures(data);
}

/* Fonction permettant de retirer la selection en cours afin d'afficher la suivante */
function clear() {
	gallery.innerHTML = '';
	searchInput.value = '';
}

curatedPhotos();
