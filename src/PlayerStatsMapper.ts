import { promises as fs } from 'fs';
import { StatsCategory } from '../types/StatsCategory';
import { AdvancedStatsCategory } from '../types/AdvancedStatsCategory';
import { PlayerResponse } from '../types/PlayerResponse';

export class PlayerStatsMapper {
	fileInfo: {
		filePath: string;
		fileName: string;
	};

	constructor(fileInfo: { filePath: string; fileName: string }) {
		this.fileInfo = fileInfo;
	}

	async mapPlayerStatsToStatNames(player: PlayerResponse) {
		try {
			const sport = 'nfl';
			const statsCategories = JSON.parse(
				await fs.readFile(
					`${this.fileInfo.filePath}/${sport}.stat_categories.json`,
					'utf8'
				)
			) as StatsCategory;
			const advancedStatsCategories = JSON.parse(
				await fs.readFile(
					`${this.fileInfo.filePath}/${sport}.advanced_stat_categories.json`,
					'utf8'
				)
			) as AdvancedStatsCategory;

			console.log(statsCategories);
			console.log(advancedStatsCategories);
			console.log(player);
		} catch (error) {
			console.error(`Error in mapPlayerStatsToStatNames(): ${error}`);
		}
	}
}
