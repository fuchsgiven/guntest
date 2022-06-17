<script>
    export let message
    export let username

    const msgClass = username === message.author ? 'sent' : 'received'
</script>

<div class="{`message-container ${msgClass}`}">
    <div class="message">
        <img class="message-img" src={`https://avatars.dicebear.com/api/initials/${message.author}.svg`} alt=""/>
        <p class="message-author">{message.author}</p>
        <p class="message-time">{message.time}</p>
    </div>
    <p>{message.text}</p>
</div>

<style>

    .message-container {
        max-width: 90%;
        min-width: 55%;
        margin: 5px 0;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
    }

    .message-container.sent {
        align-self: flex-end;
    }

    .message-container.received {
        align-self: flex-start;
    }

    .message {
        display: flex;
        align-items: center;
    }

    .message-img {
        width: 30px;
        height: 30px;
        border-radius: 100px;
        margin-right: .5em;
    }

    .message-author {
        font-size: .9em;
        font-weight: 600;
    }

    .message-time {
        margin-left: auto;
        font-size: .8em;
        color: #777;
    }
</style>