const obj = {
	incrementCount:  {
		name: 'increment-count',
		defaultVal: 1,
		type: Number,
	},
	activeTabId:  {
		name: 'activeTabId',
		defaultVal: 'dhikr',
		type: String,
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