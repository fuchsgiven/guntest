<script>
    import { createEventDispatcher } from 'svelte'
    export let username;

    const dispatch = createEventDispatcher()

    const logout = () => {
        dispatch('logout')
    }

</script>

<nav>
    <h3>MSD20 Chat</h3>
    {#if username}
        <div class="user">
            <img class="user__img" src={`https://avatars.dicebear.com/api/initials/${username}.svg`} alt=""/>
            <p class="user__name">{username}</p>
            <button class="btn" on:click={ logout }>Log Out</button>
        </div>
        
    {/if}
</nav>

<style>

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 3px 4px rgba(0, 0, 0, .05);
        padding: 20px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: white;
    }

    h3, p {
        margin: 0;
    }

    .user {
        display: flex;
        align-items: center;
    }
    .user__img {
        width: 42px;
        height: 42px;
        border-radius: 100px;
        margin-right: .5em;
    }
    .user__name {
        font-size: 1.1em;

    }

    .btn {
        margin-bottom: 0;
        margin-left: 1rem;
    }
</style>