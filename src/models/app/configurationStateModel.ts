import type { Ref } from 'vue'

export interface ConfigurationState {
  [key: string]: Ref<boolean>
}
