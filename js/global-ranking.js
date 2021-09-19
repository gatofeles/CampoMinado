function loadGlobalRanking(){
	
	const ranking = mockRanking();

	const tableRanking = document.getElementById("ranking");

	tableRanking.innerHTML = '';

	for(let i = 0; i< ranking.length; i++){

		const newRanking = document.createElement("tr");

		for(let j = 0; j < 3; j++){
			const newField = document.createElement("td");

			const label = document.createElement("span");

			let value = '';

			switch (j){
				case 0:
					value = ranking[i].username;
					break;
				case 1:
					value = ranking[i].dimension;
					break;
				case 2:
					value = ranking[i].time;
					break;
			}
			label.innerHTML = value;

			newField.appendChild(label);
			newRanking.appendChild(newField);
		}
		tableRanking.appendChild(newRanking);
	}

}

function mockRanking(){
	return [{
		username: 'Jogador 1',
		dimension: '10x10',
		time: 600
	},
	{
		username: 'Jogador 2',
		dimension: '10x10',
		time: 800
	},
	{
		username: 'Jogador 3',
		dimension: '9x9',
		time: 400
	},
	{
		username: 'Jogador 4',
		dimension: '9x9',
		time: 500
	},
	{
		username: 'Jogador 5',
		dimension: '9x9',
		time: 650
	},
	{
		username: 'Jogador 6',
		dimension: '9x9',
		time: 1000
	},
	{
		username: 'Jogador 7',
		dimension: '8x8',
		time: 655
	},
	{
		username: 'Jogador 8',
		dimension: '8x8',
		time: 777
	},
	{
		username: 'Jogador 9',
		dimension: '8x8',
		time: 987
	},
	{
		username: 'Jogador 10',
		dimension: '7x7',
		time: 400
	}]
}