import { Component, Prop, VueComponent } from '@/types'

import styles from './index.module.css'
import commonStyles from '@/assets/common.module.css'

type Props = {
	whenStart: () => void
}

@Component
export class Greeting extends VueComponent<Props> {
	@Prop({required: true}) whenStart!: Props['whenStart']

	render() {
		return (
			<div class={styles.greeting}>
				<div class={styles.title}>
					<div class={styles.text}>
						DAYS TO
					</div>
				</div>
				<button
					class={commonStyles.button}
					onClick={this.whenStart}
				>
					Start
				</button>
			</div>
		)
	}
}