import {createPinia} from 'pinia'
import {App} from 'vue'
export function setupPinia(app:App){
    app.use(createPinia())
}
