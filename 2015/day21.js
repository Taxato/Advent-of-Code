import { maxInArr, minInArr } from "../helper.js";

const bossStats = {
	hp: 104,
	dmg: 8,
	armor: 1,
};

const playerStats = {
	hp: 100,
	dmg: 0,
	armor: 0,
	goldSpent: 0,
};

const shop = {
	weapons: [
		// [cost, dmg]
		[8, 4],
		[10, 5],
		[25, 6],
		[40, 7],
		[74, 8],
	],
	armor: [
		// [cost, armor]
		[13, 1],
		[31, 2],
		[53, 3],
		[75, 4],
		[102, 5],
	],
	rings: [
		// [cost, dmg, armor]
		[25, 1, 0],
		[50, 2, 0],
		[100, 3, 0],
		[20, 0, 1],
		[40, 0, 2],
		[80, 0, 3],
	],
};

const playerWins = [];
const playerLosses = [];

for (let wpnI = 0; wpnI < shop.weapons.length; wpnI++) {
	for (let armI = -1; armI < shop.armor.length; armI++) {
		for (let ring1I = -1; ring1I < shop.armor.length; ring1I++) {
			for (let ring2I = -1; ring2I < shop.armor.length; ring2I++) {
				if (ring1I === ring2I) continue;
				const playerGear = gearUp(
					playerStats,
					wpnI,
					armI,
					ring1I,
					ring2I
				);

				fight(playerGear, bossStats);
			}
		}
	}
}

// console.log(playerWins);
console.log(minInArr(playerWins));
console.log(maxInArr(playerLosses));

function fight(p, b) {
	const player = { ...p };
	const boss = { ...b };

	const playerDmg = Math.max(player.dmg - boss.armor, 1);
	const bossDmg = Math.max(boss.dmg - player.armor, 1);

	while (true) {
		boss.hp -= playerDmg;
		if (boss.hp <= 0) {
			playerWins.push(player.goldSpent);
			break;
		}
		player.hp -= bossDmg;
		if (player.hp <= 0) {
			playerLosses.push(player.goldSpent);
			break;
		}
	}
}

function buyWeapon(stats, wpnIndex) {
	const [cost, dmg] = shop.weapons[wpnIndex];
	return {
		...stats,
		dmg: stats.dmg + dmg,
		goldSpent: stats.goldSpent + cost,
	};
}
function buyArmor(stats, armIndex) {
	const [cost, armor] = shop.armor[armIndex];
	return {
		...stats,
		armor: stats.armor + armor,
		goldSpent: stats.goldSpent + cost,
	};
}
function buyRing(stats, ringIndex) {
	const [cost, dmg, armor] = shop.rings[ringIndex];
	return {
		...stats,
		dmg: stats.dmg + dmg,
		armor: stats.armor + armor,
		goldSpent: stats.goldSpent + cost,
	};
}
function gearUp(stats, wpnIndex, armorIndex, ring1index, ring2Index) {
	let newStats = { ...stats };

	newStats = buyWeapon(newStats, wpnIndex);
	if (armorIndex !== -1) newStats = buyArmor(newStats, armorIndex);
	if (ring1index !== -1) newStats = buyRing(newStats, ring1index);
	if (ring2Index !== -1) newStats = buyRing(newStats, ring2Index);

	return newStats;
}
