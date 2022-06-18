<script>
	import Navigation from "./Navigation.svelte"
	import Login from "./Login.svelte"
	import Chat from "./Chat.svelte"
	import { gun } from "./gunInstance.js"
	import 'gun/sea'

	let username = ''

	const user = gun.user().recall({sessionStorage: true})

	user.get('alias').on(value => username = value)

	gun.on('auth', async () => {
		const alias = await user.get('alias')
		username = alias
	})

	const logout = () => {
		user.leave()
		username = ""
	}

	$: username
</script>

<div id="app">
	<Navigation on:logout={ logout } {username}/>
	<main>
		{#if username }
			<Chat {username}/>
		{:else}
			<Login {user}/>
		{/if}
	</main>
</div>

<style>

</style>