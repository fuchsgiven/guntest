import GUN from "gun"

Gun.chain.subscribe = function(publish) {
	let gun = this;
	let at = gun._;
	
	// check if the map() function has been called
	let isMap = !!(at.back || {}).each;
	
	if (isMap) {
    // creates a temporary store for all values passed by map()
		let cache = new Map()
		publish(Array.from(cache))
		
		gun = gun.on((data, key, event) => {
			let _key = Gun.node.soul(data) || event.via.soul || key;
			
			if (data === null) { // Remove this if clause if you want to return null values
				cache.delete(_key)
			} else {
				cache.set(_key, data)
			}
			
			publish(Array.from(cache))
		})
		
	} else {
		gun = gun.on(publish)
	}
	return gun.off
}
export const gun = GUN('https://msdchat.herokuapp.com/gun')
export default GUN