<template>
    <div class="quick-chat-container"
         :style="{'border-bottom-left-radius': borderStyle.bottomLeft, 'border-bottom-right-radius': borderStyle.bottomRight, 'border-top-right-radius': borderStyle.topRight, 'border-top-left-radius': borderStyle.topLeft}">
        <Header v-if="displayHeader" :colors="colors" :border-style="borderStyle" 
                :hide-close-button="hideCloseButton" :close-button-icon-size="closeButtonIconSize" @onClose="onClose()">
            <template #header>
                <slot name="header"></slot>
            </template>
        </Header>
        <MessageDisplay :colors="colors" :async-mode="asyncMode" :load-more-messages="loadMoreMessages"
                        :link-options="linkOptions"
                        :scroll-bottom="scrollBottom"
                        :profile-picture-config="profilePictureConfig"
                        :timestamp-config="timestampConfig"
                        @onImageClicked="onImageClicked"/>
        <MessageManager :colors="colors"
                        :border-style="borderStyle" :submit-icon-size="submitIconSize"
                        :submit-image-icon-size="submitImageIconSize"
                        :send-images="sendImages"
                        :accept-image-types="acceptImageTypes"
                        @onImageSelected="onImageSelected"
                        @onMessageSubmit="onMessageSubmit"
                        @onType="onType"/>
    </div>
</template>

<script>
    import Header from './Header.vue'
    import MessageDisplay from './MessageDisplay.vue'
    import MessageManager from './MessageManager.vue'
    import {mapMutations} from 'vuex'
    import store from '../store'

    export default {
        name: 'chat',
        components: {
            Header,
            MessageDisplay,
            MessageManager
        },
        props: {
            participants: {
                type: Array,
                required: true
            },
            messages: {
                type: Array,
                required: true
            },
            myself: {
                type: Object,
                required: true
            },
            chatTitle: {
                type: String,
                required: false,
                default: ''
            },
            placeholder: {
                type: String,
                required: false,
                default: 'type your message here'
            },
            colors: {
                type: Object,
                required: true
            },
            borderStyle: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        topLeft: "10px",
                        topRight: "10px",
                        bottomLeft: "10px",
                        bottomRight: "10px",
                    }
                }
            },
            hideCloseButton: {
                type: Boolean,
                required: false,
                default: false
            },
            submitIconSize: {
                type: Number,
                required: false,
                default: 24
            },
            submitImageIconSize: {
                type: Number,
                required: false,
                default: 24
            },
            closeButtonIconSize: {
                type: String,
                required: false,
                default: "15px"
            },
            asyncMode: {
                type: Boolean,
                required: false,
                default: false
            },
            loadMoreMessages: {
                type: Function,
                required: false,
                default: null
            },
            scrollBottom:{
                type: Object,
                required: false,
                default: () => {
                    return {
                        messageSent: true,
                        messageReceived: false
                    }
                }
            },
            displayHeader: {
                type: Boolean,
                required: false,
                default: true
            },
            sendImages: {
                type: Boolean,
                required: false,
                default: true
            },
            profilePictureConfig: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        others: true,
                        myself: false,
                        styles: {
                            width: '25px',
                            height: '25px',
                            borderRadius: '50%'
                        }
                    }
                }
            },
            timestampConfig: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        format: 'HH:mm',
                        relative: false
                    }
                }
            },
            linkOptions: {
                type: Object,
                required: false,
                default: () => {
                    return {
                        myself: {},
                        others: {}
                    }
                }
            },
            acceptImageTypes: {
                type: String,
                required: false,
                default: "image/*"
            }
        },
        watch: {
            participants() {
                this.setParticipants(this.participants);
            },
            myself() {
                this.setMyself(this.myself);
            },
            messages() {
                this.setMessages(this.messages);
            },
            placeholder() {
                this.setPlaceholder(this.placeholder);
            },
            chatTitle() {
                this.setChatTitle(this.chatTitle);
            }
        },
        beforeCreate() {
            this.$store = store();
        },
        created() {
            this.setParticipants(this.participants);
            this.setMyself(this.myself);
            this.setMessages(this.messages);
            this.setPlaceholder(this.placeholder);
            this.setChatTitle(this.chatTitle);
        },
        methods: {
            ...mapMutations([
                'setParticipants',
                'setMyself',
                'setMessages',
                'setPlaceholder',
                'setChatTitle'
            ]),
            onClose: function(){
                this.$emit("onClose");
            },
            onType: function(e){
                this.$emit("onType", e)
            },
            onMessageSubmit: function(message){
                this.$emit("onMessageSubmit", message)
            },
            onImageSelected: function(data){
                this.$emit("onImageSelected", data)
            },
            onImageClicked: function(message){
                this.$emit("onImageClicked", message)
            },
        },
    }
</script>

<style lang="less">
    .quick-chat-container {
        display: flex;
        width: 100%;
        height: 100%;
        background: #f0eeee;
        flex-direction: column;
        align-items: stretch;
        overflow: hidden;
    }
</style>
