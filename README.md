# vue-quick-chat
This vue component is a simple chat that can be easily imported and used in your project.

## Features
- Custom style
- Handle on type event and on message submit 
- Chat with multiple participants
<img src="https://user-images.githubusercontent.com/42742621/63946619-c3eda480-ca4b-11e9-82f0-b7636eace98d.png"/>

## Instalation
```
yarn add vue-quick-chat
```
or with npm
```
npm install vue-quick-chat --save
```

## Usage
```javascript
import { Chat } from 'vue-quick-chat'
export default {
  components: {
    Chat
  },
}
```
```html
<template>
  <div>
      <Chat 
       :participants="participants"
       :myself="myself"
       :messages="messages"
       :onType="onType"
       :onMessageSubmit="onMessageSubmit"
       :chatTitle="chatTitle"
       :placeholder="placeholder"
       :colors="colors"
       :borderStyle="borderStyle"
       :hideCloseButton="hideCloseButton"
       :closeButtonIconSize="closeButtonIconSize"
       :submitIconSize="submitIconSize"/>
   </div>
</template>
```
You can also use a slot to define the header content
```html
<div>
	<Chat 
        :participants="participants"
        :myself="myself"
        :messages="messages"
        :onType="onType"
        :onMessageSubmit="onMessageSubmit"
        :chatTitle="chatTitle"
        :placeholder="placeholder"
        :colors="colors"
        :borderStyle="borderStyle"
        :hideCloseButton="hideCloseButton"
        :closeButtonIconSize="closeButtonIconSize"
        :submitIconSize="submitIconSize">
        <template v-slot:header>
          <div>
            <p v-for="(participant, index) in participants" :key="index" class="custom-title">{{participant.name}}</p>
          </div>
        </template>
        </Chat>
</div>
```
Bellow we have an example of the component data structure
```javascript
import { Chat } from 'vue-quick-chat'
export default {
  components: {
    Chat
  },
  data(){
    return {
      participants: [
        {
          name: 'Arnaldo',
          id: 1
        },
        {
          name: 'José',
          id: 2
        }
      ],
      myself: {
        name: 'Matheus S.',
        id: 3
      },
      messages: [
        {
          content: 'received messages', 
          myself: false,
          participantId: 1,
          timestamp: { year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123 }
        },
        {
          content: 'sent messages', 
          myself: true,
          participantId: 3,
          timestamp: { year: 2019, month: 4, day: 5, hour: 19, minute: 10, second: 3, millisecond:123 }
        },
        {
          content: 'other received messages', 
          myself: false,
          participantId: 2,
          timestamp: { year: 2019, month: 5, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123 }
        }
      ],
      chatTitle: 'My chat title',
      placeholder: 'send your message',
      colors:{
        header:{
          bg: '#d30303',
          text: '#fff'
        },
        message:{
          myself: {
            bg: '#fff',
            text: '#bdb8b8'
          },
          others: {
            bg: '#fb4141',
            text: '#fff'
          }
        },
        messagesDisplay: {
            bg: '#f7f3f3'
        },
        submitIcon: '#b91010'
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: false,
      submitIconSize: "20px",
      closeButtonIconSize: "20px"
    }
  },
  methods: {
    onType: function (event){
      //here you can set any behavior
    },
    onMessageSubmit: function(message){
      /*
      * example simulating an upload callback. 
      * It's important to notice that even when your message wasn't send 
      * yet to the server you have to add the message into the array
      */
      this.messages.push(message)
      
      /*
      * you can update message state after the server response
      */
     // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true
      }, 2000)
    },
  }
```
## Component Props
| name | type | required |default |description |
|------|------|----------|--------|------------|
| participants | Array | true |  | An array of participants. Each [participant](#participant) should be an Object with name and id|
| myself | Object | true |  | Object of my [participant](#participant). "myself" should be an Object with name and id|
| messages | Array | true |  | An array of [messages](#message). Each message should be an Object with content, myself, participantId and timestamp|
| onType | Function | false | () => false | Event called when the user is typing |
| onMessageSubmit | Function | false | () => false | Event called when the user sends a new message |
| chatTitle | String | false | Empty String | The title on chat header |
| placeholder | String | false | 'type your message here' | The placeholder of message text input |
| colors | Object | true |  | Object with the [color's](#color) description of style properties |
| borderStyle | Object | false | { topLeft: "10px", topRight: "10px", bottomLeft: "10px", bottomRight: "10px"}  | Object with the description of border style properties |
| hideCloseButton | Boolean | false | false  | If true, the Close button will be hidden |
| submitIconSize | String | false | "15px" | The submit icon size in pixels. |
| closeButtonIconSize | String | false | "15px" | The close button icon size in pixels. |

### participant
| name | type | description |
|---------|--------|----------------|
| id | int | The user id should be an unique value |
| name | String | The user name that will be displayed |

Example
```javascript
{
  name:  'Username',
  id: 1
},
```
### message
| name | type | description |
|---------|--------|----------------|
| content | String | The message text content |
| myself | boolean | Wether the message was sent by myself participant or by other participant |
| participantId | int | The participant's id who sent the message  |
|timestamp| Object| Object describing the year, month, day, hour, minute, second and millisecond that the message was sent |

Example
```javascript
{
  content: 'received messages', 
  myself: false,
  participantId: 1,
  timestamp: { year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123 }
}
```
### color
| name | type | description |
|---------|--------|----------------|
| header | Object | Object containing the header background and text color |
| message | Object | Object containing the message background and text color. The Object should contains the style for 'myself' and 'others' |
| messagesDisplay | Object | Object containing the  background color of mesages container. |
| submitIcon | String | The color applied to the send message button icon |

Example
```javascript
{
  header:{
    bg: '#d30303',
    text: '#fff'
  },
  message:{
    myself: {
      bg: '#fff',
      text: '#bdb8b8'
    },
    others: {
      bg: '#fb4141',
      text: '#fff'
    }
  },
  messagesDisplay: {
    bg: '#f7f3f3'
  },
  submitIcon: '#b91010'
}
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
