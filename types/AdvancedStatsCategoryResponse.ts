export type AdvancedStatsCategoryResponse = {
	xml:            string;
	fantasyContent: FantasyContent;
}

export type FantasyContent = {
	game: Game;
}

export type Game = {
	gameKey:                number;
	gameID:                 number;
	name:                   string;
	code:                   string;
	type:                   string;
	url:                    string;
	season:                 number;
	isRegistrationOver:     number;
	isGameOver:             number;
	isOffseason:            number;
	isLiveDraftLobbyActive: number;
	advancedStatCategories: AdvancedStatCategories;
}

export type AdvancedStatCategories = {
	glossaryURL: string;
	stats:       Stats;
}

export type Stats = {
	stat: Stat[];
}

export type Stat = {
	statID:            number;
	name:              string;
	displayName:       string;
	sortOrder:         number;
	statPositionTypes: StatPositionTypes;
}

export type StatPositionTypes = {
	statPositionType: StatPositionType;
}

export type StatPositionType = {
	positionType:      PositionType;
	isOnlyDisplayStat: number;
}

export enum PositionType {
	P = 'P',
}
