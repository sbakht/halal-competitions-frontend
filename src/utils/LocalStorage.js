const obj = {
	incrementCount: {
		defaultVal: 1,
		type: Number,
	}
}

export default {
	set(str, val) {
		if (!obj[str]) {
			throw new Error(str + ' is not set for default value in local storage')
		}
		window.localStorage.setItem(str, val);
	},
	get(str) {
		const val = window.localStorage.getItem(str) || obj[str].defaultVal;

		if (obj[str].type === Number) {
			return Number.parseInt(val);
		}

		if (obj[str].type === Object) {
			return JSON.parse(val);
		}

		return val;
	}
}