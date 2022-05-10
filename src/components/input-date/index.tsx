import { removeTimeOffset } from '@/helpers/time-offset'
import { Component, VueComponent, Prop } from '@/types'

import commonStyles from '@/assets/common.module.css'
import styles from './index.module.css'
import { mask } from 'vue-the-mask'

type Props = {
  whenBack: () => void
  whenDateSelect: (name: string, date: Date) => void
}

@Component({
	directives: {
		mask
	}
})
export class InputDate extends VueComponent<Props> {
	@Prop() whenBack: Props['whenBack']
	@Prop() whenDateSelect: Props['whenDateSelect']

	name = ''
	dateString = ''

	get isNameValid() {
		return this.name.length > 0
	}

	get date(): Date | null {
		if (this.dateString.length < 10) return null
		const [day, month, year] = this.dateString.split('/')
		return new Date(+year, +month - 1, +day)
	}

	get invalid() {
		return !this.isNameValid || !this.date
	}

	get dateMask() {
		return {
			mask: 'Dd/Mm/####',
			tokens: {
				'D': {pattern: /([0-3])/},
				'd': {pattern: (
					this.dateString[0] !== '3'
						? this.dateString[0] !== '0'
							? /\d/
							: /[1-9]/
						: /[01]/
				)},
				'M': {pattern: /([01])/},
				'm': {pattern: this.dateString[3] !== '1' ? /[1-9]/ : /[0-2]/},
				'#': {pattern: /\d/}
			}
		}
	}

	whenSubmit(event: Event) {
		event.preventDefault()

		if (this.invalid || !this.date) {
			return
		}

		this.whenDateSelect(this.name, this.date)
	}

	render() {
		return (
			<form
				class={styles.inputDate}
				onSubmit={(event: Event) => this.whenSubmit(event)}
			>
				<div class={commonStyles.title}>
					<font-awesome-icon
						onClick={this.whenBack}
						icon="fa-solid fa-arrow-left"
						class={commonStyles.backIcon}
					/>
					Input your date
				</div>

				<div class={styles.twoFields}>
					<input
						class={[
							styles.input,
							{[styles.invalid]: !this.isNameValid}
						]}
						value={this.name}
						onInput={
							(event: InputEvent) => {
								const eventTarget = event.target as HTMLInputElement
								this.name = eventTarget.value
							}
						}
						placeholder="Timer name"
					/>

					<input
						v-mask={this.dateMask}
						placeholder="dd/mm/yyyy"
						class={[
							styles.input,
							{[styles.placeholder]: !this.dateString.length},
							{[styles.invalid]: !this.date}
						]}
						onInput={
							(event: Event) => {
								const eventTarget = event.target as HTMLInputElement
								this.dateString = eventTarget.value
							}
						}
					/>
				</div>

				{!this.invalid && (
					<button
						class={[commonStyles.button, styles.buttonTransition]}
						disabled={this.invalid}
					>
						Submit
					</button>
				)}
			</form>
		)
	}
}