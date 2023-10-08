export type StatsCategoryResponse = {
	xml:            string;
	fantasyContent: FantasyContent;
}

export type FantasyContent = {
	game: Game;
}

export type Game = {
	gameKey:            number;
	gameID:             number;
	name:               string;
	code:               string;
	type:               string;
	url:                string;
	season:             number;
	isRegistrationOver: number;
	isGameOver:         number;
	isOffseason:        number;
	statCategories:     StatCategories;
}

export type StatCategories = {
	stats: Stats;
}

export type Stats = {
	stat: Stat[];
}

export type Stat = {
	statID:        number;
	name:          string;
	displayName:   string;
	sortOrder:     number;
	positionTypes: PositionTypes;
}

export type PositionTypes = {
	positionType: PositionTypeElement[] | PositionTypeElement;
}

export enum PositionTypeElement {
	DP = 'DP',
	Dt = 'DT',
	K = 'K',
	O = 'O',
}
