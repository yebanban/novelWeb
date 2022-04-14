import { App } from 'vue';
import { setupPinia } from "./pinia"
export function setupPlugins(app:App){
    setupPinia(app)
}