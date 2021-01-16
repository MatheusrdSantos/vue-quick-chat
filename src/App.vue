<template>
    <div id="app">
        <div class="content">
            <div class="chat-container">
                <Chat v-if="visible"
                      :participants="participants"
                      :myself="myself"
                      :messages="messages"
                      :chat-title="chatTitle"
                      :placeholder="placeholder"
                      :colors="colors"
                      :border-style="borderStyle"
                      :hide-close-button="hideCloseButton"
                      :close-button-icon-size="closeButtonIconSize"
                      :submit-icon-size="submitIconSize"
                      :submit-image-icon-size="submitImageIconSize"
                      :load-more-messages="toLoad.length > 0 ? loadMoreMessages : null"
                      :async-mode="asyncMode"
                      :scroll-bottom="scrollBottom"
                      :display-header="true"
                      :send-images="true"
                      :profile-picture-config="profilePictureConfig"
                      :timestamp-config="timestampConfig"
                      :link-options="linkOptions"
                      :accept-image-types="'.png, .jpeg'"
                      @onImageClicked="onImageClicked"
                      @onImageSelected="onImageSelected"
                      @onMessageSubmit="onMessageSubmit"
                      @onType="onType"
                      @onClose="onClose('param value')"/>
            </div>
            <div class="external-controller">
                <div class="controller-btn-container">
                    <button class="btn-message" @click="addMessage">Add menssage</button>
                    <button class="btn-participant" @click="addParticipant">Add participant</button>
                    <button class="btn-participant" @click="changeAllProps">Change All Props</button>
                </div>
                <div class="message-list">
                    <ol>
                        <li v-for="(message, index) in messages" :key="index">
                            {{message.content}}
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Chat from './components/Chat.vue'

    export default {
        name: 'app',
        components: {
            Chat
        },
        data() {
            return {
                visible: true,
                participants: [
                    {
                        name: 'Arnaldo',
                        id: 1,
                        profilePicture: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/NafSadh_Profile.jpg/768px-NafSadh_Profile.jpg'
                    },
                    {
                        name: 'Adam',
                        id: 2,
                        profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
                    }
                ],
                myself: {
                    name: 'John Doe',
                    id: 3,
                    profilePicture: 'https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg'
                },
                messages: [
                    {
                        content: "Really?! I don't care! Haha",
                        participantId: 1,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true,
                        type: 'text'
                    },
                    {
                        content: "Really?! I don't care! Haha",
                        participantId: 1,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true,
                        type: 'text'
                    },
                    {
                        content: "Really?! I don't care! Haha",
                        participantId: 1,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true,
                        type: 'text'
                    },
                    {
                        content: "Hey, Jhon Doe! How are you today",
                        participantId: 1,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true,
                        type: 'text'
                    },
                    {
                        content: "Hey, Adam! I'm felling really fine this evening.",
                        participantId: 3,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true,
                        type: 'text'
                    },
                    {
                        content: "Really?! I don't care! Haha www.google.com",
                        participantId: 1,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true,
                        type: 'text'
                    },
                ],
                chatTitle: 'My chat title',
                placeholder: 'send your message',
                colors: {
                    header: {
                        bg: '#d30303',
                        text: '#fff'
                    },
                    message: {
                        myself: {
                            bg: '#fff',
                            text: '#525252'
                        },
                        others: {
                            bg: '#fb4141',
                            text: '#fff'
                        },
                        messagesDisplay: {
                            //bg: 'rgb(247, 243, 243)',
                            //bg: '#f7f3f3'
                            bg: '#f7f3f3'
                        }
                    },
                    submitIcon: '#b91010',
                    submitImageIcon: '#b91010',
                },
                borderStyle: {
                    topLeft: "10px",
                    topRight: "10px",
                    bottomLeft: "10px",
                    bottomRight: "10px",
                },
                hideCloseButton: false,
                submitIconSize: 24,
                submitImageIconSize: 24,
                closeButtonIconSize: "20px",
                asyncMode: true,
                toLoad: [
                    {
                        content: 'Hey, John Doe! How are you today?',
                        participantId: 2,
                        timestamp: { year: 2016, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123 },
                        uploaded: true,
                        viewed: true
                    },
                    {
                        content: "Hey, Adam! I'm feeling really fine this evening.",
                        participantId: 3,
                        timestamp: { year: 2016, month: 1, day: 5, hour: 19, minute: 10, second: 3, millisecond:123 },
                        uploaded: true,
                        viewed: true
                    },
                ],
                scrollBottom: {
                    messageSent: true,
                    messageReceived: false
                },
                profilePictureConfig: {
                    others: true,
                    myself: true,
                    styles: {
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%'
                    }
                },
                timestampConfig: {
                    format: 'HH:mm',
                    relative: false
                },
                // there are other options, you can check them here
                // https://soapbox.github.io/linkifyjs/docs/options.html
                linkOptions: {
                    myself: {
                        className: 'myLinkClass',
                        events: {
                            click: function (e) {
                                alert('Link clicked!');
                            },
                            mouseover: function (e) {
                                alert('Link hovered!');
                            }
                        },
                        format: function (value, type) {
                            if (type === 'url' && value.length > 50) {
                                value = value.slice(0, 50) + '…';
                            }
                            return value;
                        }
                    },
                    others: {
                        className: 'othersLinkClass',
                        events: {
                            click: function (e) {
                                alert('Link clicked!');
                            },
                            mouseover: function (e) {
                                alert('Link hovered!');
                            }
                        },
                        format: function (value, type) {
                            if (type === 'url' && value.length > 50) {
                                value = value.slice(0, 50) + '…';
                            }
                            return value;
                        }
                    }
                }
            }
        },
        methods: {
            // eslint-disable-next-line
            onType: function (e) {
                // eslint-disable-next-line
                console.log('typing');
            },
            loadMoreMessages(resolve) {
                setTimeout(() => {
                    resolve(this.toLoad);
                    //Make sure the loaded messages are also added to our local messages copy or they will be lost
                    this.messages.unshift(...this.toLoad);
                    this.toLoad = [];
                }, 1000);
            },
            onMessageSubmit(message) {
                /*
                * example simulating an upload callback.
                * It's important to notice that even when your message wasn't send
                * yet to the server you have to add the message into the array
                */
                this.messages.push(message);

                /*
                * you can update message state after the server response
                */
                // timeout simulating the request
                setTimeout(() => {
                    message.uploaded = true
                    message.viewed = true
                }, 2000)
            },
            onClose(param) {
                console.log(param)
                this.visible = false;
            },
            addMessage() {
                /* this.messages.push(
                    {
                        content: "Update state",
                        // myself: false,
                        participantId: 1,
                        timestamp: {year: 2014, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true
                    }
                ) */
                this.messages.push(
                    {
                        type: 'image',
                        preview: null,
                        src: 'https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg',
                        content: 'image',
                        participantId: 1,
                        timestamp: {year: 2014, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: false
                    }
                )
            },
            addParticipant() {
                let participant = {
                    name: 'Karl',
                    id: 4
                };
                this.participants.push(participant)
            },
            changeAllProps() {
                this.myself = {
                    name: 'I Qanah',
                    id: 3
                };
                this.participants = [
                    {
                        name: 'Ibrahim',
                        id: 5
                    },
                    {
                        name: 'Ana',
                        id: 6
                    }
                ];
                this.messages = [
                    {
                        content: "Really?! I don't care! Haha",
                        participantId: 5,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true
                    },
                    {
                        content: "Really?! I don't care! Haha",
                        participantId: 6,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true
                    },
                    {
                        content: "Really?! I don't care! Haha",
                        participantId: 3,
                        timestamp: {year: 2012, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
                        uploaded: true,
                        viewed: true
                    }
                ];

                this.toLoad = [
                    {
                        content: 'Hey, John Doe! How are you today?',
                        participantId: 6,
                        timestamp: { year: 2016, month: 3, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123 },
                        uploaded: true,
                        viewed: true
                    },
                    {
                        content: "Hey, Adam! I'm feeling really fine this evening.",
                        participantId: 3,
                        timestamp: { year: 2016, month: 10, day: 5, hour: 19, minute: 10, second: 3, millisecond:123 },
                        uploaded: true,
                        viewed: true
                    },
                ];

                this.chatTitle = 'Change All Participants';
                this.placeholder = 'اكتب رسالتك هنا';
            },
            onImageSelected({file, message}){
                let src = 'https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR.jpg'
                this.messages.push(message);
                /**
                 * This timeout simulates a requisition that uploads the image file to the server.
                 * It's up to you implement the request and deal with the response in order to
                 * update the message status and the message URL
                 */
                setTimeout((res) => {
                    message.uploaded = true
                    message.src = res.src
                }, 3000, {src});
            },
            onImageClicked(message){
                /**
                 * This is the callback function that is going to be executed when some image is clicked.
                 * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
                 */
                console.log('Image clicked', message.src)
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .chat-container {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(247, 243, 243);
        padding: 10px 0 10px 0;
        height: 500px;
        width: 350px;
    }

    .external-controller {
        background: #2c3e50;
        height: 300px;
        width: 600px;
        display: flex;
        color: #eee;
    }

    .controller-btn-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        flex-wrap: wrap;
    }

    .btn-message {
        cursor: pointer;
        background: #eee;
        border: none;
        height: 40px;
        color: #2c3e50;
        border-radius: 5px;
        outline: none;
        transition: 0.3s;
    }

    .btn-participant {
        cursor: pointer;
        background: #eee;
        border: none;
        height: 40px;
        color: #2c3e50;
        border-radius: 5px;
        outline: none;
        transition: 0.3s;
    }

    .btn-message:hover {
        background: rgb(255, 255, 255);
    }

</style>
