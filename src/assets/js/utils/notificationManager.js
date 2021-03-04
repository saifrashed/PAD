/**
 * Implementation of a simple Session Manager
 *
 * @author Lennard Fonteijn & Pim Meijer
 */
class NotificationManager {

    constructor() {

    }

    alert(type, message) {
        switch (type) {
            case "info":
                notie.alert({type: 'info', text: message, position: 'bottom'});
                break;
            case "success":
                notie.alert({type: 'success', text: message, position: 'bottom'});
                break;
            case "error":
                notie.alert({type: 'error', text: message, position: 'bottom'});
                break;
            case "warning":
                notie.alert({type: 'warning', text: message, position: 'bottom'});
                break;

        }
    }
}
