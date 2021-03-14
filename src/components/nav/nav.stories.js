import Nav from './nav';

export default {
  title: 'Nav',
  component: Nav,
}


function setMobile(story) {
  story.parameters = { viewport: { defaultViewport: 'mobile2' }}
}


const Template = (args, { argTypes }) => ({
  components: { Nav },
  props: Object.keys(argTypes),
  template: '<Nav v-bind="$props" v-on="$props" />',
});

export const Guest = Template.bind({})
Guest.args = {isLoggedIn: false, isMobileMenuOpen: false}

export const LoggedIn = Template.bind({})
LoggedIn.args = {isLoggedIn: true, isMobileMenuOpen: false}

export const MobileGuest = Template.bind({})
MobileGuest.args = {isLoggedIn: false, isMobileMenuOpen: false}
setMobile(MobileGuest);

export const MobileGuestMenuOpen = Template.bind({})
MobileGuestMenuOpen.args = {isLoggedIn: false, isMobileMenuOpen: true}
setMobile(MobileGuestMenuOpen);

export const MobileLoggedInMenuOpen = Template.bind({})
MobileLoggedInMenuOpen.args = {isLoggedIn: true, isMobileMenuOpen: true}
setMobile(MobileLoggedInMenuOpen);
