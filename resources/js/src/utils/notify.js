import { store } from 'react-notifications-component';



 let notifier = (type, title, msg, pos = {
    insert: 'bottom', container: 'bottom-right',
    animationIn: ['animated', 'fadeIn'], animationOut: ['animated', 'fadeOut'],
    dismiss: {
        duration: 3000, onScreen: true, pauseOnHover: true
    }
}) => {
    // now make notifier here
    store.addNotification({
        title: title,
        message: msg,
        type: type,
        insert: pos.insert,
        container: pos.container,
        animationIn: pos.animationIn,
        animationOut: pos.animationOut,
        dismiss: pos.dismiss
    })
}

export default notifier




/*
store.addNotification({
  title: "Wonderful!",
  message: "teodosii@react-notifications-component",
  type: "success",
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 5000,
    onScreen: true
  }
});
*/