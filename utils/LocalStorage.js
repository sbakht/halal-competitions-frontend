const obj = {
	incrementCount: {
		name: 'increment-count',
		defaultVal: 1,
		type: Number,
	},
	language: {
		name: 'language',
		defaultVal: ['english', 'arabic'],
		type: Array,
	},
	activeTabId: {
		name: 'activeTabId',
		defaultVal: 'dhikr',
		type: String,
	},
	carouselMode: {
		name: 'carousel-mode',
		defaultVal: false,
		type: Boolean,
	},
}

obj.setItem = function setItem(str, val) {
	window.localStorage.setItem(str, val);
}

obj.getItem = function setItem(str) {
	return window.localStorage.getItem(str);
}

function get() {
	const val = window.localStorage.getItem(this.name) || this.defaultVal;
	if (val === this.defaultVal) {
		return val;
	}

	if (this.type === Number) {
		return Number.parseInt(val);
	}

	if (this.type === Object) {
		return JSON.parse(val);
	}

	if (this.type === Array) {
		console.log(val)
		return val.split(',')
	}

	if (this.type === Boolean) {
		return val === 'true';
	}

	return val;
}

function set(val) {
	console.log(`Setting ${this.name} as ${val} in localstorage`)
	window.localStorage.setItem(this.name, val);
}

Object.keys(obj).map(key => {
	obj[key] = Object.assign(obj[key], { get, set })
})

export default obj;