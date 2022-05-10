import {
	Component,
	VueComponent,
	Prop,
} from '@/types'
import {
	differenceInYears,
	differenceInMonths,
	getDate,
	differenceInCalendarDays,
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
	format
} from 'date-fns'

import styles from './index.module.css'
import commonStyles from '@/assets/common.module.css'

interface IBlock {
	title: string,
	value: number
}

type Props = {
	name: string
	date: Date | null
	whenBack: () => void
}

@Component
export class Counter extends VueComponent<Props> {
	@Prop() name: Props['name']
	@Prop() date: Props['date']
	@Prop() whenBack: Props['whenBack']

	currentDate = new Date()
	timerId = 0

	get isPreviousEvent() {
		if (!this.date) {
			return
		}

		return this.currentDate > this.date
	}

	getDays(date: Date) {
		const months = differenceInMonths(date, this.currentDate) % 12
		const daysDifference = getDate(date) - getDate(this.currentDate)
		let newDate = date

		if (!months) {
			if (daysDifference > 0) differenceInCalendarDays(date, this.currentDate) - 1
			return differenceInCalendarDays(date, this.currentDate)
		}

		if (this.currentDate > date) {
			newDate = new Date(this.currentDate.getUTCFullYear(), this.currentDate.getMonth() - 1, date.getDate())
		} else {
			newDate = new Date(this.currentDate.getUTCFullYear(), this.currentDate.getMonth() + 1, date.getDate())
		}

		if (daysDifference > 0) differenceInCalendarDays(newDate, this.currentDate) - 1
		return differenceInCalendarDays(newDate, this.currentDate)
	}

	get blocks(): IBlock[] {
		if (!this.date) {
			return []
		}

		return [
			{
				title: "Years",
				value: differenceInYears(this.date, this.currentDate),
			},
			{
				title: "Months",
				value: differenceInMonths(this.date, this.currentDate) % 12,
			},
			{
				title: "Days",
				value: this.getDays(this.date)
			},
			{
				title: "Hours",
				value: differenceInHours(this.date, this.currentDate) % 24,
			},
			{
				title: "Minutes",
				value: differenceInMinutes(this.date, this.currentDate) % 60,
			},
			{
				title: "Seconds",
				value: differenceInSeconds(this.date, this.currentDate) % 60,
			},
		]
	}

	get firstIndex() {
		return this.blocks.findIndex(block => (block.value))
	}

	created() {
		this.timerId = setInterval(() => {
			this.currentDate = new Date()
		}, 1000)
	}

	unmounted() {
		clearInterval(this.timerId)
	}

	renderBlock(title: string, value: number) {
		return (
			<div class={styles.block}>
				<div class={styles.label}>
					{title}
				</div>
				<div class={styles.number}>
					{Math.abs(value)}
				</div>
			</div>
		)
	}

	render() {
		if (!this.date) {
			return
		}

		return (
			<div class={styles.counter}>
				<div class={styles.header}>
					<div class={commonStyles.title}>
						<font-awesome-icon
							onClick={this.whenBack}
							icon="fa-solid fa-arrow-left"
							class={commonStyles.backIcon}
						/>
						{this.isPreviousEvent
							? `Counter from`
							: `Counter until`
						}
					</div>
					<div class={styles.name}>
						<div>{this.name}</div>
						<div>{format(this.date, 'dd.MM.yyyy')}</div>
					</div>
				</div>

				<div class={styles.timer}>
					{this.blocks.map((block, index) => (
						index >= this.firstIndex &&
							this.renderBlock(block.title, block.value)
					))}
				</div>
			</div>
		)
	}
}
