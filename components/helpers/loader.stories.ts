import Loader from './loader.vue'

export default {
  title: 'Loader',
}

const Template = (args: Record<string, unknown>, { argTypes }: { argTypes: Record<string, unknown> }) => ({
  components: { Loader },
  props: Object.keys(argTypes),
  template: '<Loader v-bind="$props" v-on="$props" />',
})

export const Primary = Template.bind({})
