import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pb from './pb';

const app = createApp(App);

app.use(router);

app.mount('#app')

if (pb.authStore.isValid) {
    console.log('کاربر لاگین شده:', pb.authStore.model);
}

pb.authStore.onChange((token, model) => {
    console.log('وضعیت احراز هویت تغییر کرد:', token, model);
});

