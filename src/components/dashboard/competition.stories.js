import Competition from './competition';

import * as IncrementStories from './increment.stories';

export default {
  title: 'Competition',
  component: Competition,
}

const Template = (args, { argTypes }) => ({
  components: { Competition },
  props: Object.keys(argTypes),
  template: '<Competition v-bind="$props" v-on="$props" />',
});

export const Primary = Template.bind({})
Primary.args = {
  loggers: [
    IncrementStories.Zero.args.logger,
    IncrementStories.Value.args.logger,
    IncrementStories.Target.args.logger,
    {...IncrementStories.Target.args.logger, id:'someid', title: 'Line Wrap', count: 125, target: 0},
  ],
}

