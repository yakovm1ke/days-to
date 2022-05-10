import { Component, VueComponent, Prop } from '@/types'

import styles from './index.module.css'
import commonStyles from '@/assets/common.module.css'

type Props = {
  whenSelectDate: () => void
  whenInputDate: () => void
}

@Component
export class StartMenu extends VueComponent<Props> {
	@Prop() whenSelectDate: Props['whenSelectDate']
	@Prop() whenInputDate: Props['whenInputDate']

	render() {
		return (
			<div class={styles.startMenu}>
				<div class={commonStyles.title}>
					Welcome to DAYS TO
				</div>
				<div class={styles.text}>
					Hi there! You can choose one of two options to calculate
					how long time has passed from date or how much time is left
					until event
				</div>
				<div class={styles.buttons}>
					<button
						class={commonStyles.button}
						onClick={this.whenInputDate}
					>
						<div class={commonStyles.icon}>
							<font-awesome-icon icon="fa-solid fa-pen-clip" />
						</div>
						Input self date
					</button>
					<button
						class={commonStyles.button}
						onClick={this.whenSelectDate}
					>
						<div class={commonStyles.icon}>
							<font-awesome-icon icon="fa-solid fa-list-check" />
						</div>
						Select from suggestions
					</button>
				</div>
			</div>
		)
	}
}