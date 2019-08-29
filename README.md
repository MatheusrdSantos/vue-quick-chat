# vue-quick-chat
This vue component is a simple chat that can be easily imported and used in your project.

## Features
- Custom style
- Handle on type event and on message submit 
- Chat with multiple participants

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
Vue.use(Chat)
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
       :borderStyle="borderStyle"/>
   </div>
</template>
```
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
          timestamp: { year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123 },
          id: 1
        },
        {
          content: 'sent messages', 
          myself: true,
          participantId: 3,
          timestamp: { year: 2019, month: 4, day: 5, hour: 19, minute: 10, second: 3, millisecond:123 },
          id: 2
        },
        {
          content: 'other received messages', 
          myself: false,
          participantId: 2,
          timestamp: { year: 2019, month: 5, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123 },
          id: 3
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
        submitIcon: '#b91010'
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      }
    }
  },
  methods: {
    onType: function (){
      //here you can set any behavior
    },
    onMessageSubmit: function(){
      //here you can set any behavior
    }
  }
```
## Component Props
| name | type | required |default |description |
|------|------|----------|--------|------------|
| participants | Array | true |  | An array of participants. Each participant should be an Object with name and id|
| myself | Object | true |  | Object of my participant. "myself" should be an Object with name and id|
| messages | Array | true |  | An array of messages. Each message should be an Object with content, myself, participantId, timestamp and id |
| onType | Function | false | () => false | Event called when the user is typing |
| onMessageSubmit | Function | false | () => false | Event called when the user sends a new message |
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
