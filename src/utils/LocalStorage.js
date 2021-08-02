const obj = {
	incrementCount:  {
		name: 'increment-count',
		defaultVal: 1,
		type: Number,
	}
}

function get() {
	const val = window.localStorage.getItem(this.name) || this.defaultVal;

	if (this.type === Number) {
		return Number.parseInt(val);
	}

	if (this.type === Object) {
		return JSON.parse(val);
	}

	return val;
}

function set(val) {
	window.localStorage.setItem(this.name, val);
}

Object.keys(obj).map(key => {
	obj[key] = Object.assign(obj[key], {get, set})
})

export default obj;