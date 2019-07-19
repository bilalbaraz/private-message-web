
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
const axios = require('axios');
import Echo from "laravel-echo"
import Pusher from "pusher-js"
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('message-box', require('./components/MessageBox.vue').default);

const app = new Vue({
    el: '#app'
});



window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '617eb618dfe84e4bd0f3', // key .env dosyasından alınacak
    cluster: 'eu',
    encrypted: true
});


window.Echo.private('chat')
    .listen('MessageSent', (e) => {
        this.messages.push({
            message: e.message.message,
            user: e.user
        });
    });