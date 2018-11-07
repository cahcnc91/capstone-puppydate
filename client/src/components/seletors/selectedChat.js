import { createSelector } from 'reselect';

const activeChatSelector = state => state.activeChat

const getChats = (activeChat) => {
  console.log(activeChat)
  if (activeChat === {}) {
    
    activeChat= {
      messages: 'No Messages yet'
    }
    console.log(activeChat)
  }
  return activeChat;
};

export default createSelector(
  activeChatSelector,
  getChats
);

