<script>
    import Message from "./Message.svelte"
    import { gun } from "./gunInstance.js"
    import _ from 'lodash'

    export let username
    let msg_text
    let bottom_el
    let store = {}

    const scrollToBottom = _.debounce(() => {
        bottom_el?.scrollIntoView({ behavior: 'auto' })
    }, 300)

    gun.get("testchatnodeid").map().on(function(data, key) {
        if (data) {
            store[key] = data
            scrollToBottom()
        } else {
            delete store[key]
            store = store
        }
    })

    const sendMsg = () => {
        gun.get("testchatnodeid").set({ text: msg_text, author: username, time: new Date().getTime() })
        msg_text = ''
        scrollToBottom()
    }

    $: messages = Object.entries(store)
</script>

<div id="chat">
    <div id="messages">
        <div class="container">
            {#each messages as [key, message] (key)}
                <Message {message} {username}/>
            {/each}
        </div>

        <div bind:this="{bottom_el}"/>
    </div>

    <form on:submit|preventDefault={sendMsg}>
        <input type="text" bind:value={msg_text} maxlength="100" />
        <button type="submit" disabled={!msg_text}>></button>
    </form>
</div>

<style>

    #messages {
        height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;
        background-color: #f3f4f5;
    }

    .container {
        padding-top: 100px;
        padding-bottom: 100px;
        display: flex;
        flex-direction: column;
        max-width: 500px;
        margin: 0 auto;
    }

    form {
        padding: 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 3px 4px rgba(0, 0, 0, .05);
    }
</style>