interface IDate {
	name: string
	date: {
		day: number,
		month: number,
		year?: number,
	}
}

/**
 * month - месяц в привычной форме, однако для new Date()
 * придется вычитать из month 1, поскольку отсчет месяцев ведется от 0
 */

export const dates: IDate[] = [
	{
		name: 'День рождения Миши',
		date: {
			day: 3,
			month: 11,
		}
	},
	{
		name: 'День рождения Ани',
		date: {
			day: 6,
			month: 6,
		}
	},
	{
		name: 'Новый год',
		date: {
			day: 1,
			month: 1
		}
	},
]