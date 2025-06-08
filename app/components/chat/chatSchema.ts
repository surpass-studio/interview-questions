import * as v from 'valibot'

const chatSchema = {
	input: v.pipe(v.string(), v.trim(), v.minLength(1)),
}

export default chatSchema
