import { z } from 'zod/v4'

const chatSchema = {
	input: z.string().trim().nonempty(),
}

export default chatSchema
