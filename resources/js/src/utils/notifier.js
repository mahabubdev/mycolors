import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";

export default function notify( _type, msg ){
    // notification dynamic
    return notifier.type(msg);
}
