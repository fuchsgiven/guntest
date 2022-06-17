<script>
    import Message from "./Message.svelte";
    import { gun } from "./gunInstance.js";

    export let username
    let newMessage
    let bottomEl
    let store = {}

    const scrollToBottom = () => {
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => bottomEl?.scrollIntoView({ behavior: 'auto' }), 300);
    }

    gun.get("MSD20chat03").map().on(function(data, key) {
        if (data) {
            store[key] = data
            scrollToBottom()
        } else {
            delete store[key]
            store = store
        }
    })

    //const messages = gun.get("MSD20chat03").map()

    const sendMsg = () => {
        gun.get("MSD20chat03").set({ text: newMessage, author: username, time: new Date().toLocaleString() })
        newMessage = ''
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

        <div bind:this="{bottomEl}"/>
    </div>

    <form on:submit|preventDefault={sendMsg}>
        <input type="text" bind:value={newMessage} maxlength="100" />
        <button type="submit" disabled={!newMessage}>></button>
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