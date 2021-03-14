import Loader from './loader.vue';

export default {
  title: 'Loader',
  component: Loader,
}

const Template = (args, { argTypes }) => ({
  components: { Loader },
  props: Object.keys(argTypes),
  template: '<Loader v-bind="$props" v-on="$props" />',
});

export const Primary = Template.bind({})