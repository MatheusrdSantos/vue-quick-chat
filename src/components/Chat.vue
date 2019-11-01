<template>
    <div class="quick-chat-container"
         :style="{'border-bottom-left-radius': borderStyle.bottomLeft, 'border-bottom-right-radius': borderStyle.bottomRight, 'border-top-right-radius': borderStyle.topRight, 'border-top-left-radius': borderStyle.topLeft}">
        <Header :colors="colors" :border-style="borderStyle" :hide-close-button="hideCloseButton"
                :close-button-icon-size="closeButtonIconSize" :on-close="onClose">
            <template #header>
                <slot name="header"></slot>
            </template>
        </Header>
        <MessageDisplay :colors="colors" :async-mode="asyncMode"/>
        <MessageManager :on-type="onType" :on-message-submit="onMessageSubmit" :colors="colors"
                        :border-style="borderStyle" :submit-icon-size="submitIconSize"/>
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
            onType: {
                type: Function,
                required: false,
                default: () => false
            },
            onMessageSubmit: {
                type: Function,
                required: false,
                default: () => false
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
                type: String,
                required: false,
                default: "15px"
            },
            closeButtonIconSize: {
                type: String,
                required: false,
                default: "15px"
            },
            onClose: {
                type: Function,
                required: false,
                default: () => false
            },
            asyncMode: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        watch: {
            messages: function () {
                this.setMessages(this.messages);
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
            ])
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
