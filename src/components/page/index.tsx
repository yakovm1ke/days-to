import { VueComponent, Component } from '@/types'

import { Greeting } from '@/components/greeting'
import { StartMenu } from '@/components/start-menu'
import { InputDate } from '@/components/input-date'
import { SelectDate } from '@/components/select-date'
import { Counter } from '@/components/counter'

import styles from './index.module.css'

enum EComponents {
	Greeting = 1,
	StartMenu = 2,
	InputDate = 3,
	SelectDate = 4,
	Counter = 5,
}

@Component
export class Page extends VueComponent {
	currComponentId = EComponents.Greeting
	name = ''
	date: Date | null = null

	get currentComponent() {
		switch(this.currComponentId) {
		case(EComponents.Greeting):
			return (
				<Greeting
					whenStart={() => this.changeComponent(EComponents.StartMenu)}
				/>
			)
		case(EComponents.StartMenu):
			return (
				<StartMenu
					whenInputDate={() => this.changeComponent(EComponents.InputDate)}
					whenSelectDate={() => this.changeComponent(EComponents.SelectDate)}
				/>
			)
		case(EComponents.InputDate):
			return (
				<InputDate
					whenBack={() => this.changeComponent(EComponents.StartMenu)}
					whenDateSelect={(name: string, date: Date) => {
						this.name = name
						this.date = date
						this.changeComponent(EComponents.Counter)
					}}
				/>
			)
		case(EComponents.SelectDate):
			return (
				<SelectDate
					whenBack={() => this.changeComponent(EComponents.StartMenu)}
					whenDateSelect={(name: string, date: Date) => {
						this.name = name
						this.date = date
						this.changeComponent(EComponents.Counter)
					}}
				/>
			)
		case(EComponents.Counter):
			return (
				<Counter
					date={this.date}
					name={this.name}
					whenBack={() => this.changeComponent(EComponents.StartMenu)}
				/>
			)
		default:
			return (
				<Greeting
					whenStart={() => this.changeComponent(EComponents.StartMenu)}
				/>
			)
		}
	}

	mounted() {
		window.addEventListener('keydown', (event: KeyboardEvent) => {
			if(event.key === 'Escape') this.changeComponent(EComponents.Greeting)
		})
	}

	changeComponent(value: EComponents) {
		this.currComponentId = value
	}

	render() {
		return (
			<div class={styles.page}>
				<div class={styles.container}>
					{this.currentComponent}
				</div>
			</div>
		)
	}
}