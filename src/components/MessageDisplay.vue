<template>
    <div ref="containerMessageDisplay" :style="{background: colors.message.messagesDisplay.bg}"
         class="container-message-display" @scroll="updateScrollState">
        <div v-if="loading" class="loader">
            <div class="message-loading"></div>
        </div>
        <div v-for="(message, index) in messages" :key="index" class="message-container"
             :class="{'my-message': message.myself, 'other-message': !message.myself}">
            <div class="message-text"
                 :style="{background: !message.myself?colors.message.others.bg: colors.message.myself.bg, color: !message.myself?colors.message.others.text: colors.message.myself.text}">
                <p v-if="!message.myself" class="message-username">{{getParticipantById(message.participantId).name}}</p>
                <p v-else class="message-username">{{myself.name}}</p>
                <p>{{message.content}}</p>
            </div>
            <div class="message-timestamp" :style="{'justify-content': message.myself?'flex-end':'baseline'}">
                {{message.timestamp.format('LT')}}
                <v-feather-icon v-if="asyncMode && message.uploaded" name="check" base-class="icon-sent"/>
                <div v-else-if="asyncMode" class="message-loading"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';

    export default {
        props: {
            colors: {
                type: Object,
                required: true
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
            }
        },
        data() {
            return {
                updateScroll: true,
                lastMessage: null,
                loading: false
            }
        },
        computed: {
            ...mapGetters([
                'getParticipantById',
                'messages',
                'myself'
            ]),
        },
        mounted() {
            this.goToBottom();
            this.$refs.containerMessageDisplay.dispatchEvent(new CustomEvent('scroll'));
        },
        updated() {
            if (this.messages.length && this.messages[this.messages.length - 1] !== this.lastMessage && this.updateScroll) {
                this.goToBottom();
                if (this.messages.length) {
                    this.lastMessage = this.messages[this.messages.length - 1]
                }
            }
        },
        methods: {
            ...mapMutations([
                'setMessages',
            ]),
            updateScrollState({target: {scrollTop, clientHeight, scrollHeight}}) {
                this.updateScroll = scrollTop + clientHeight >= scrollHeight;

                if (typeof this.loadMoreMessages === 'function' && scrollTop < 20) {
                    this.loading = true;
                    this.loadMoreMessages((messages) => {
                        if (Array.isArray(messages) && messages.length > 0) {
                            this.setMessages([...messages, ...this.messages]);
                        }
                        this.loading = false;
                    });
                }
            },
            goToBottom() {
                let scrollDiv = this.$refs.containerMessageDisplay;
                scrollDiv.scrollTop = scrollDiv.scrollHeight;

                this.updateScroll = false;
            }
        }
    }
</script>

<style lang="less">
    .quick-chat-container .container-message-display {
        flex: 1;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        max-height: 100%;
                /************** Safari 10.1+ ********************/
        @media not all and (min-resolution:.001dpcm)
        { @supports (-webkit-appearance:none) {

            .message-container{
                display:-webkit-box !important;
            }
            
        }}

        .message-text {
            background: #fff;
            padding: 6px 10px;
            line-height: 14px;
            border-radius: 15px;
            margin: 5px 0 5px 0;
            max-width: 70%;
            overflow-wrap: break-word;
            text-align: left;
            white-space: pre-wrap;
        }

        .message-text > p {
            margin: 5px 0 5px 0;
            font-size: 14px;
        }

        .message-timestamp {
            padding: 2px 7px;
            border-radius: 15px;
            margin: 0;
            max-width: 50%;
            overflow-wrap: break-word;
            text-align: left;
            font-size: 10px;
            color: #bdb8b8;
            width: 100%;
            display: flex;
            align-items: center;
        }

        .my-message > .message-timestamp {
            text-align: right;
        }

        .my-message {
            justify-content: flex-end;
            padding-right: 15px;
            align-items: flex-end;
        }

        .other-message {
            justify-content: flex-start;
            padding-left: 15px;
            align-items: flex-start;
        }

        .other-message > .message-text {
            color: #fff;
            border-bottom-left-radius: 0;
        }

        .my-message > .message-text {
            border-bottom-right-radius: 0;
        }

        .message-container {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
        }

        .message-username {
            font-size: 10px;
            font-weight: bold;
        }

        .icon-sent {
            width: 12px;
            padding-left: 5px;
            color: rgb(129, 127, 127);
        }

        .message-loading {
            height: 8px;
            width: 8px;
            border: 1px solid rgb(187, 183, 183);
            border-left-color: rgb(59, 59, 59);
            border-radius: 50%;
            margin-left: 5px;
            display: inline-block;
            animation: spin 1.3s ease infinite;
        }

        .loader .message-loading {
            width: 16px;
            height: 16px;
            margin: 5px 0 0 0;
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
