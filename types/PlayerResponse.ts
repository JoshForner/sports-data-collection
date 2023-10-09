export type PlayerResponse = {
	xml:            string;
	fantasyContent: FantasyContent;
}

export type FantasyContent = {
	player: Player;
}

export type Player = {
	playerKey:                string;
	playerID:                 number;
	name:                     Name;
	url:                      string;
	editorialPlayerKey:       string;
	editorialTeamKey:         string;
	editorialTeamFullName:    string;
	editorialTeamAbbr:        string;
	editorialTeamURL:         string;
	byeWeeks:                 ByeWeeks;
	isKeeper:                 IsKeeper;
	uniformNumber:            number;
	displayPosition:          string;
	headshot:                 Headshot;
	imageURL:                 string;
	isUndroppable:            number;
	positionType:             string;
	eligiblePositions:        EligiblePositions;
	hasPlayerNotes:           number;
	hasRecentPlayerNotes:     number;
	playerNotesLastTimestamp: number;
	playerStats:              PlayerStats;
	playerAdvancedStats:      PlayerStats;
}

export type ByeWeeks = {
	week: number;
}

export type EligiblePositions = {
	position: string;
}

export type Headshot = {
	url:  string;
	size: string;
}

export type IsKeeper = {
	status: string;
	cost:   string;
}

export type Name = {
	full:       string;
	first:      string;
	last:       string;
	asciiFirst: string;
	asciiLast:  string;
}

export type PlayerStats = {
	coverageType: string;
	season:       number;
	stats:        Stats;
}

export type Stats = {
	stat: Stat[];
}

export type Stat = {
	statID: number;
	value:  number;
}
