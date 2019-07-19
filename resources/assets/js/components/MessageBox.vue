<template>
    <div>
    <div class="row">
        <div class="col-lg-12">
            <button type="button" class="btn btn-primary" v-on:click="fetchData">Yenile</button>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2 message-box" v-if="messages.length">
            <div class="row message" v-for="message in messages" :key="message.id">
                <div class="col-lg-3 col-sm-3 message--author">{{ message.user.name }}</div>
                <div class="col-lg-9 col-sm-9">{{ message.message }}</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-sm-8 col-sm-offset-2">
            <div class="form-group">
                <label>Mesajınız:</label>
                <textarea class="form-control" rows="3" v-model="textarea"></textarea>
            </div>
        </div>
        <div class="col-lg-8 col-lg-offset-2 col-sm-8 col-sm-offset-2">
            <button type="button" class="btn btn-success" :disabled="textarea.length < 10" v-on:click="sendMessage">Gönder</button>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                messages: [],
                textarea: ''
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                axios
                    .get('/messages')
                    .then(response => {
                        this.messages = response.data;
                    })
            },
            sendMessage() {
                axios
                    .post('/send-message', { message: this.textarea })
                    .then(response => {
                        this.fetchData()
                    })
            }
        }
    }
</script>
