import fs from 'node:fs/promises'
import { micromark } from 'micromark'
import { luoguUserMentions, luoguUserMentionsHTML } from './dev/index.js'

const buf = await fs.readFile('example.md')
const out = micromark(buf, { extensions: [luoguUserMentions()], htmlExtensions: [luoguUserMentionsHTML()] })
console.log(out)
