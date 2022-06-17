<script>
	import Navigation from "./Navigation.svelte";
	import Login from "./Login.svelte";
	import Chat from "./Chat.svelte";
	import { gun } from "./gunInstance.js";
	import 'gun/sea';

	const user = gun.user().recall({sessionStorage: true});

	let uname = ''

	user.get('alias').on(value => uname = value);

	gun.on('auth', async (event) => {
		const alias = await user.get('alias');
		uname = alias
	})

	function logout() {
		user.leave()
		location.reload()
	}

	$: username = uname
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