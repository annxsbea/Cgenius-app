import * as Notifications from 'expo-notifications';


export   const scheduleNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,   
        
      },
      trigger: {
        seconds: 1, 
      },
    });
  };