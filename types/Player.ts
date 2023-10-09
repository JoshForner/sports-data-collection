export type Player = {
	player: PlayerClass;
}

export type PlayerClass = {
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
	playerStats:              PlayerStat[];
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
	full:  string;
	first: string;
	last:  string;
}

export type PlayerStat = {
	season: number;
	stats:  Stat[];
}

export type Stat = {
	statID:      number;
	name:        string;
	displayName: string;
	value:       number;
}
