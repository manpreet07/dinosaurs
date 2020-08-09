let dinos = [];

/**
 * Get data from dino.json
 */
fetch('http://localhost:3000/dino.json')
	.then(response => response.json())
	.then(data => {
		data.forEach(dino => {
			dinos.push(new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact))
		});
	});

/**
 * Dino Constructor
 * @param {string} species
 * @param {number} weight
 * @param {number} height
 * @param {string} diet
 * @param {string} where
 * @param {string} when
 * @param {string[]} fact
 */
function Dino(species, weight, height, diet, where, when, fact) {
	this.species = species;
	this.weight = weight;
	this.height = height;
	this.diet = diet;
	this.where = where;
	this.when = when;
	this.facts = [fact];
}

/**
 * Human constructor
 * @param {string} name
 * @param {number} weight
 * @param {object} height
 * @param {string} diet
 */
function Human(name, weight, height, diet) {
	this.name = name;
	this.weight = weight;
	this.height = height;
	this.diet = diet;
}

/**
 * Use IIFE to get human data from form
 */
const getHumanData = (function () {
	return {
		humanData: function () {
			const name = document.getElementById("name").value;
			const weight = document.getElementById("weight").value;
			const height = {
				feet: document.getElementById("feet").value,
				inches: document.getElementById("inches").value
			};
			const diet = document.getElementById("diet").value;
			return new Human(name, weight, height, diet);
		}
	}
})();


/**
 * Create Height of Human and Dinosaurs
 *
 * @param {Dino} dinos
 * @param {Human} human
 */
function compareHeight(dinos, human) {
	for (const dino of dinos) {
		if (dino.species !== 'Pigeon') {
			if (dino.height > human.height.feet) {
				dino.facts.push(`${dino.species} is ${dino.height - human.height.feet} feet taller than ${human.name}`);
			} else {
				dino.facts.push(`${human.name} is ${human.height.feet - dino.height} feet taller than ${dino.species}`);
			}
		}
	}
	return dinos;
}

/**
 * Create Weight of Human and Dinosaurs
 *
 * @param {Dino} dinos
 * @param {Human} human
 */
function compareWeight(dinos, human) {
	for (const dino of dinos) {
		if (dino.species !== 'Pigeon') {
			if (dino.weight > human.weight) {
				dino.facts.push(`${dino.species} is ${dino.weight - human.weight} lb heavier than ${human.name}`);
			} else {
				dino.facts.push(`${human.name} is ${human.weight - dino.weight} lb heavier than ${dino.species}`);
			}
		}
	}
	return dinos;
}

/**
 * Create Diet of Human and Dinosaurs
 *
 * @param {Dino} dinos
 * @param {Human} human
 */
function compareDiet(dinos, human) {
	for (const dino of dinos) {
		if (dino.species !== 'Pigeon') {
			dino.facts.push(`${dino.species} diet is ${dino.diet} and ${human.name} diet is ${human.diet}`);
		}
	}
	return dinos;
}

/**
 * Generate Tiles for each Dino in Array
 */
const tiles = function generateTiles() {
	const grid = document.getElementById('grid');
	// add human to the list
	const human = getHumanData.humanData();
	compareDiet(dinos, human);
	compareHeight(dinos, human);
	compareWeight(dinos, human);
	dinos.splice(4, 0, human);
	for (let i = 0; i < dinos.length; i++) {
		const grid_item_element = document.createElement('div');
		grid_item_element.classList = `grid-item`;
		grid.appendChild(grid_item_element);
		const h3_element = document.createElement('h3');
		const img_element = document.createElement('img');
		const p_element = document.createElement('p');
		grid_item_element.appendChild(h3_element)
		grid_item_element.appendChild(img_element)
		grid_item_element.appendChild(p_element)

		if (i === 4) {
			img_element.setAttribute('src', `images/human.png`);
			h3_element.innerHTML = human.name;
		} else {
			img_element.setAttribute('src', `images/${dinos[i].species.toLowerCase()}.png`);
			h3_element.innerHTML = dinos[i].species;
			p_element.innerHTML = dinos[i].facts[Math.floor(Math.random() * dinos[i].facts.length)];
		}
	}
}

/**
 * Add tiles to DOM
 */
// eslint-disable-next-line no-unused-vars
function addTiles() {
	tiles(dinos);
	removeForm();
}

/**
 * Remove form from screen
 */
function removeForm() {
	const element = document.getElementById('dino-compare');
	element.parentNode.removeChild(element);
}
