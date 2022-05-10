import { VueComponent, Component} from '@/types';
import { Page } from '@/components/page';
import '@/assets/colors.css'
import 'normalize.css'

@Component
export class App extends VueComponent {
	render() {
		return (
			<Page />
		)
	}
}