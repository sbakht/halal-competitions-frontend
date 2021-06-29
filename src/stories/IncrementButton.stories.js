import StoryComponent from '../components/dashboard/IncrementButton.vue';

export default {
  title: 'IncrementalButton',
  component: StoryComponent
}

const Template = (args, { argTypes }) => ({
  components: { StoryComponent },
  props: Object.keys(argTypes),
  template: '<StoryComponent v-bind="$props" v-on="$props" />',
});

export const Zero = Template.bind({});
Zero.args = {
  logger: { id: 'dhikr_2', title: 'Beans', count: 0, target: 0 },
}

export const Value = Template.bind({});
Value.args = {
  logger: { id: 'dhikr_1', title: 'Cool', count: 10, target: 0 },
}

export const Target = Template.bind({});
Target.args = {
  logger: { id: 'dhikr_3', title: 'Meme', count: 15, target: 25 },
}