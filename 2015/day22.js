import { pipe, sumProp } from "./helper.js";

const spells = [
	{
		name: "Magic Missile",
		cost: 53,
		damage: 4,
		armor: 0,
		heal: 0,
		mana: 0,
		turns: 1,
	},
	{
		name: "Drain",
		cost: 73,
		damage: 2,
		armor: 0,
		heal: 2,
		mana: 0,
		turns: 1,
	},
	{
		name: "Shield",
		cost: 113,
		damage: 0,
		armor: 7,
		heal: 0,
		mana: 0,
		turns: 6,
	},
	{
		name: "Poison",
		cost: 173,
		damage: 3,
		armor: 0,
		heal: 0,
		mana: 0,
		turns: 6,
	},
	{
		name: "Recharge",
		cost: 229,
		damage: 0,
		armor: 0,
		heal: 0,
		mana: 101,
		turns: 5,
	},
];

const initialState = {
	playerHp: 50,
	playerMp: 500,
	mpSpent: 0,
	playerArmor: 0,
	bossHp: 51,
	bossDmg: 9,
	activeEffects: [],
};

function hasBattleEnded(state) {
	return state.playerHp <= 0 || state.bossHp <= 0;
}

function getAvailSpells(state) {
	if (hasBattleEnded(state)) return [];

	return spells.filter(spell => {
		const active = state.activeEffects.find(
			effect => spell.name === effect.name
		);
		return spell.cost <= state.playerMp && (!active || active.turns === 1);
	});
}

function enactEffects(state) {
	if (hasBattleEnded(state)) return state;

	return {
		...state,
		playerMp: state.playerMp + sumProp(state.activeEffects, "mana"),
		playerArmor: sumProp(state.activeEffects, "armor"),
		bossHp: state.bossHp - sumProp(state.activeEffects, "damage"),
		activeEffects: state.activeEffects.reduce(
			(effects, effect) =>
				effect.turns > 1
					? [...effects, { ...effect, turns: effect.turns - 1 }]
					: effects,
			[]
		),
	};
}

const damagePlayer = state => ({ ...state, playerHp: state.playerHp - 1 });

function playerTurn(spell) {
	return state => {
		if (hasBattleEnded(state)) return state;
		const isSpellEffect = spell.turns > 1;

		return {
			...state,
			playerHp: state.playerHp + (isSpellEffect ? 0 : spell.heal),
			playerMp: state.playerMp - spell.cost,
			mpSpent: state.mpSpent + spell.cost,
			bossHp: state.bossHp - (isSpellEffect ? 0 : spell.damage),
			activeEffects: isSpellEffect
				? [...state.activeEffects, spell]
				: state.activeEffects,
		};
	};
}

function bossTurn(state) {
	if (hasBattleEnded(state)) return state;

	return {
		...state,
		playerHp:
			state.playerHp - Math.max(state.bossDmg - state.playerArmor, 1),
	};
}

function roundOfBattle(spell) {
	return pipe(enactEffects, playerTurn(spell), enactEffects, bossTurn);
}

function hardRoundOfBattle(spell) {
	return pipe(damagePlayer, roundOfBattle(spell));
}

function isPlayerWinner(state) {
	return hasBattleEnded(state) && state.playerHp > 0;
}

function minMpSpent(config, round) {
	let minMp = Infinity;

	function recur(state) {
		if (state.mpSpent > minMp) return;

		if (getAvailSpells(state).length === 0) {
			if (isPlayerWinner(state)) minMp = state.mpSpent;
			return;
		}

		for (const spell of getAvailSpells(state)) {
			recur(round(spell)(state));
		}
	}

	recur({
		...config,
		playerArmor: 0,
		mpSpent: 0,
		activeEffects: [],
	});

	return minMp;
}

const part1 = minMpSpent({ ...initialState }, roundOfBattle);
console.log(part1);

const part2 = minMpSpent({ ...initialState }, hardRoundOfBattle);
console.log(part2);
