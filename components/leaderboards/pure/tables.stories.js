import Leaderboards from './tables'

export default {
  title: 'Leaderboard Tables',
}

function setMobile(story) {
  story.parameters = { viewport: { defaultViewport: 'mobile2' }}
}

const Template = (args, { argTypes }) => ({
  components: { Leaderboards },
  props: Object.keys(argTypes),
  template: '<Leaderboards v-bind="$props" v-on="$props" />',
});

const data = [
  { title: 'SubhanAllah' , users: [
    {username: 'Bob Ross', count: 50},
    {username: 'Steve Ross', count: 75},
    {username: 'CoolGuy23', count: 40},
    {username: 'Memer', count: 32},
    {username: 'Luke', count: 45},
    {username: 'Bro', count: 8},
  ]},
  { title: 'Alhamdulillah' , users: [
    {username: 'Bro', count: 80},
    {username: 'Memer', count: 6},
  ]},
];


export const Primary = Template.bind({})
Primary.args = {data}

export const Mobile = Template.bind({})
Mobile.args = {data}
setMobile(Mobile);
