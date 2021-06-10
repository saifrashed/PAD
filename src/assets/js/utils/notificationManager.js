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

    input(text, submitCb) {


        notie.input({
            text: text,
            submitText: "Verzenden", // optional, default = 'Submit'
            cancelText: "Annuleren", // optional, default = 'Cancel'
            position: "bottom", // optional, default = 'top', enum: ['top', 'bottom']
            submitCallback: submitCb,
        })
    }

    select(title, choices) {
        notie.select({
            text:       title,
            cancelText: 'Sluit',
            choices:    choices
        })
    }

    confirm(message, submitCallback) {
        notie.confirm({
            text: message,
            submitText: "Ja", // optional, default = 'Yes'
            cancelText: "Nee", // optional, default = 'Cancel'
            position: "bottom", // optional, default = 'top', enum: ['top', 'bottom']
            submitCallback: submitCallback, // optional
        })
    }
}
