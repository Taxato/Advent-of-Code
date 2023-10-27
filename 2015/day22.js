import { maxInArr, minInArr } from "./helper.js";

const bossStats = {
	hp: 51,
	dmg: 9,
};

const playerStats = {
	hp: 50,
	armor: 0,
	mana: 500,
	spentMana: 0,
};

const playerWins = [];

const initialState = {
	turn: 0, // 0=player, 1=boss
	activeEffects: [],
	player: playerStats,
	boss: bossStats,
};

function castSpell(state, spell) {
	switch (spell) {
		case "magicMissile":
			state.boss.hp -= 4;
			break;
		case "drain":
			state.boss.hp -= 2;
			state.player.hp += 2;
		case "shield":
			state.activeEffects.push([6, "shield"]);
		case "poison":
			state.activeEffects.push([6, "poison"]);
		case "recharge":
			state.activeEffects.push([5, "recharge"]);
	}
}

function updateTurn(state) {
	const newState = {
		activeEffects: [...state.activeEffects],
		player: { ...state.player },
		boss: { ...state.boss },
	};

	activeEffects.filter(effect => {
		const [duration, name] = effect;

		switch (name) {
			case "shield":
				player.armor = 7;
				break;
			case "poison":
				break;
			case "recharge":
				break;
		}

		if (duration - 1 === 0) return false;
		return [duration - 1, name];
	});

	newState.turn = (state.turn + 1) % 2;
	return newState;
}
