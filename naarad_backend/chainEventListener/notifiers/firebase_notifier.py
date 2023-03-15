from notifiers.notifier import Notifier
from firebase_admin import messaging


class FirebaseNotifier(Notifier):
    def __init__(self, firebase_app):
        super().__init__()
        self.firebase_app = firebase_app

    def send_notification(self, device_token: str, dapp_name: str, notification_data: dict):
        print(f"Sending notification to device {device_token} of dapp {dapp_name}")
        message = messaging.Message(data=notification_data, token=device_token)
        response = messaging.send(message)
        print("Response from firebase", response)
