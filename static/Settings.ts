export interface SettingChoice<T = string | number> {
  name: string
  value: T
}

export interface SettingDefinition<T = string | number> {
  title: string
  subtitle: string
  choices: SettingChoice<T>[]
}

export interface RangeSettingDefinition {
  title: string
  subtitle: string
  min: number
  max: number
}

export interface SettingsSchema {
  incrementCount: RangeSettingDefinition
  language: SettingDefinition<string>
}

const Settings: SettingsSchema = {
  incrementCount: {
    title: 'Increment',
    subtitle: 'Number of points for each button press',
    min: 1,
    max: 100,
  },
  language: {
    title: 'Language',
    subtitle: 'What language should be included in the dhikr section?',
    choices: [
      {
        name: 'English',
        value: 'english',
      },
      {
        name: 'Arabic',
        value: 'arabic',
      },
    ],
  },
}

export default Settings
