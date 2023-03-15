import threading


class Notifier:
    __singleton_lock = threading.Lock()
    __singleton_instance = None

    def __init__(self):
        pass

    def send_notification(self, device_token: str, dapp_name: str, notification_data: dict):
        raise NotImplementedError
