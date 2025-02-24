import * as v from 'valibot'

const inputValidationSchema = v.pipe(v.string(), v.trim(), v.minLength(1))

export default inputValidationSchema
