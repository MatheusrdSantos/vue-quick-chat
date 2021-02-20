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
        <div v-if="sendAttachments" class="container-send-message icon-send-message" @click="pickAttachment">
            <input ref="inputAttachment" :accept="acceptAttachmentTypes" type="file" style="display: none;" @input="handleAttachmentChange">
            <PaperclipIcon :size="submitAttachmentIconSize" :fill-color="colors.submitAttachmentIcon"/>
        </div>
    </div>
</template>

<script>
    //import 'vue-material-design-icons/styles.css';
    import {mapMutations} from 'vuex'
    import { DateTime } from "luxon";
    import SendIcon from 'vue-material-design-icons/Send';
    import ImageIcon from 'vue-material-design-icons/Image';
    import PaperclipIcon from 'vue-material-design-icons/Paperclip';
    export default {
        components: {
            SendIcon,
            ImageIcon,
            PaperclipIcon
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
            },
            submitAttachmentIconSize: {
                type: Number,
                required: false,
                default: 24
            },
            sendAttachments: {
                type: Boolean,
                required: false,
                default: true
            },
            acceptAttachmentTypes: {
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
                //this.onImageSelected({file, message})
                this.newMessage(message)
            },
            pickAttachment: function(){
                this.$refs.inputAttachment.click()
            },
            handleAttachmentChange: async function(e){
                const files = e.target.files
                let message = {
                    type: 'image',
                    src: '',
                    content: 'attachment',
                    participantId: this.myself.id,
                    timestamp: DateTime.local(),
                    uploaded: false,
                    viewed: false
                };
                const  fileType = files[0]['type'];
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                if(validImageTypes.includes(fileType)){
                    message.preview = URL.createObjectURL(files[0])
                }else{
                    message.preview = 'data:image/jpeg;base64,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'
                }
                this.$emit("onAttachmentSelected", {file: files[0], message});
                //this.onAttachmentSelected({file, message})
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
