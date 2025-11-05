// src/i18n.d.ts
import 'vue-i18n'
import type { MessageSchema } from './index'

declare module 'vue-i18n' {
  export type DefineLocaleMessage = MessageSchema
}