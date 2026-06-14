export interface SettingChoice<T = string | number> {
  name: string
  value: T
}

export interface SettingDefinition<T = string | number> {
  title: string
  subtitle: string
  choices: SettingChoice<T>[]
}

export interface SettingsSchema {
  incrementCount: SettingDefinition<number>
  language: SettingDefinition<string>
}

const Settings: SettingsSchema = {
  incrementCount: {
    title: 'Increment',
    subtitle: 'Number of points for each button press',
    choices: [
      {
        name: '+ 1',
        value: 1,
      },
      {
        name: '+ 5',
        value: 5,
      },
    ],
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
