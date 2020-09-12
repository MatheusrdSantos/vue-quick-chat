<template>
    <div class="container-message-manager">
        <div class="message-text-box">
            <div ref="userInput" class="message-input" :placeholder="placeholder"
                 tabIndex="0" contenteditable="true"
                 @input="handleType" @keyup.enter.exact="sendMessage"></div>
        </div>
        <div class="container-send-message icon-send-message" @click.prevent="sendMessage">
            <SendIcon :size="submitIconSize" :fill-color="colors.submitIcon"/>
        </div>
        <div v-if="sendImages" class="container-send-message icon-send-message" @click="pickImage">
            <input ref="inputImage" :accept="acceptImageTypes" type="file" style="display: none;" @input="handleImageChange">
            <ImageIcon :size="submitImageIconSize" :fill-color="colors.submitImageIcon"/>
        </div>
    </div>
</template>

<script>
    //import 'vue-material-design-icons/styles.css';
    import {mapMutations} from 'vuex'
    import { DateTime } from "luxon";
    import SendIcon from 'vue-material-design-icons/Send';
    import ImageIcon from 'vue-material-design-icons/Image';
    export default {
        components: {
            SendIcon,
            ImageIcon
        },
        props: {
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
            sendImages: {
                type: Boolean,
                required: false,
                default: true
            },
            acceptImageTypes: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                textInput: ''
            }
        },
        computed: {
            myself() {
                return this.$store.state.myself;
            },
            placeholder() {
                return this.$store.state.placeholder;
            }
        },
        methods: {
            ...mapMutations([
                'newMessage'
            ]),
            sendMessage(e) {
                this.textInput = this.$refs.userInput.textContent;
                this.$refs.userInput.textContent = '';
                // match characters that are different of spaces, tabs, line breaks...
                const matchNotEmpty = /[^\s]+/i
                // match characters that are between line spaces, tabs, line breaks...
                const contentMatch = this.textInput.match(/^\s*((.|\n)+?)\s*$/i)
                if (this.textInput && matchNotEmpty.test(this.textInput) && contentMatch) {
                    let message = {
                        content: contentMatch[1],
                        // myself: true,
                        participantId: this.myself.id,
                        timestamp: DateTime.local(),
                        uploaded: false,
                        viewed: false,
                        type: 'text'
                    };
                    this.$emit("onMessageSubmit", message);
                    //this.onMessageSubmit(message);
                    this.newMessage(message)
                }
            },
            handleType: function (e) {
                this.$emit("onType", e);
            },
            pickImage: function(){
                this.$refs.inputImage.click()
            },
            handleImageChange: async function(e){
                const files = e.target.files
                let message = {
                    type: 'image',
                    preview: URL.createObjectURL(files[0]),
                    src: '',
                    content: 'image',
                    participantId: this.myself.id,
                    timestamp: DateTime.local(),
                    uploaded: false,
                    viewed: false
                };
                this.$emit("onImageSelected", {file: files[0], message});
                //this.onImageSelected(files, message)
                this.newMessage(message)
            }
        }
    }
</script>

<style lang="less">
    .quick-chat-container .container-message-manager {
        height: 65px;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 0 20px 0 20px;
        -webkit-box-shadow: 0px -2px 40px 0px rgba(186, 186, 186, 0.67);
        box-shadow: 0px -2px 40px 0px rgba(186, 186, 186, 0.67);

        .message-text-box {
            padding: 0 10px 0 10px;
            flex: 1;
            overflow: hidden;
        }

        .message-input {
            width: 100%;
            resize: none;
            border: none;
            outline: none;
            box-sizing: border-box;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.33;
            white-space: pre-wrap;
            word-wrap: break-word;
            color: #565867;
            -webkit-font-smoothing: antialiased;
            max-height: 40px;
            bottom: 0;
            overflow: scroll;
            overflow-x: hidden;
            overflow-y: auto;
            text-align: left;
            cursor: text;
            display: inline-block;
        }

        .message-input:empty:before {
            content: attr(placeholder);
            display: block; /* For Firefox */
            filter: contrast(15%);
            outline: none;
        }

        .message-input:focus {
            outline: none;
        }

        .container-send-message {
            margin-left: 10px;
        }

        .container-send-message svg {
            -webkit-box-sizing: content-box;
            box-sizing: content-box;
        }

        .icon-send-message {
            cursor: pointer;
            opacity: 0.7;
            transition: 0.3s;
            border-radius: 11px;
            padding: 8px;
        }

        .icon-send-message:hover {
            opacity: 1;
            background: #eee;
        }
    }
</style>
