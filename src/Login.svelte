<script>
    export let user
    let username
    let password

    const login = () => {
        user.auth(username, password, ({ err }) => err && alert(err))
    }

    const signin = () => {
        user.create(username, password, ({ err }) => {
            if (err) {
                console.log(err)
                alert(err)
            } else {
                login()
            }
        });
    }
</script>

<div id="login">
    <label for="username">Username</label>
    <input bind:value={username} name="username" id="username" type="text" />

    <label for="password">Password</label>
    <input bind:value={password} name="password" id="password" type="password"/>

    <button class="btn" on:click={login}>Log In</button>
    <button class="btn" on:click={signin}>Sign Up</button>
</div>

<style>
    #login {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        padding-top: 100px;
        margin: 0 auto;
    }

    input, .btn {
        margin-bottom: 1rem;
    }
</style>
