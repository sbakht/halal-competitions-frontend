import Nav from './nav';
import Vue from 'vue';
import Vuex from 'vuex';

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
Guest.args = {isLoggedIn: false}

export const LoggedIn = Template.bind({})
LoggedIn.args = {...Guest.args, isLoggedIn: true}

export const MobileGuest = Template.bind({})
MobileGuest.args = {isLoggedIn: false, isMobileMenuOpen: false}
setMobile(MobileGuest);

export const MobileGuestMenuOpen = Template.bind({})
MobileGuestMenuOpen.args = {isLoggedIn: false, isMobileMenuOpen: true}
setMobile(MobileGuestMenuOpen);

export const MobileLoggedInMenuOpen = Template.bind({})
MobileLoggedInMenuOpen.args = {isLoggedIn: true, isMobileMenuOpen: true}
setMobile(MobileLoggedInMenuOpen);
