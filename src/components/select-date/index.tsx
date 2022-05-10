import { Component, VueComponent, Prop } from '@/types'
import { dates } from '@/assets/dates'
import { format } from 'date-fns'

import { removeTimeOffset } from '@/helpers/time-offset'
import commonStyles from '@/assets/common.module.css'
import styles from './index.module.css'

type Props = {
	whenBack: () => void
	whenDateSelect: (name: string, date: Date) => void
}

@Component
export class SelectDate extends VueComponent<Props> {
	@Prop() whenBack: Props['whenBack']
	@Prop() whenDateSelect: Props['whenDateSelect']

	get dates() {
		return dates.map(date => {
			if (!date.date.year) {
				const year = removeTimeOffset(new Date()).getFullYear()
				const currYearDate = new Date(year, date.date.month - 1, date.date.day)

				if (new Date() < currYearDate) {
					return {
						name: date.name,
						date: currYearDate
					}
				}

				return {
					name: date.name,
					date: new Date(year + 1, date.date.month - 1, date.date.day)
				}
			}

			return {
				name: date.name,
				date: removeTimeOffset(new Date(date.date.year, date.date.month - 1, date.date.day))
			}
		}).sort((a, b) => {
			return a.date.getTime() - b.date.getTime()
		})
	}

	render() {
		return (
			<div class={styles.selectDate}>
				<div class={commonStyles.title}>
					<font-awesome-icon
						onClick={this.whenBack}
						icon="fa-solid fa-arrow-left"
						class={commonStyles.backIcon}
					/>
					Select date
				</div>

				<div class={styles.selectArea}>
					{this.dates.map(date => (
						<div
							class={styles.date}
							onClick={() => this.whenDateSelect(date.name, date.date)}
						>
							<div class={styles.name}>{date.name}</div>
							<div class={styles.dateValue}>{format(date.date, 'dd.MM.yyyy')}</div>
						</div>
					))}
				</div>
			</div>
		)
	}
}