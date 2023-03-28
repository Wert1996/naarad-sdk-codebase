import json

from naarad_common.exceptions.invalid_input import InvalidInputException

from model.activity_input import ActivityInput


class PostDappInput(ActivityInput):
    def __init__(self, event):
        self.dapp_name, self.dapp_package_name, self.notification_config = None, None, None
        super().__init__(event)

    @staticmethod
    def load_notification_config(notification_config):
        if notification_config is None:
            return {}
        try:
            return json.loads(notification_config)
        except Exception as e:
            raise InvalidInputException("Invalid json provided as notification config.")

    def convert_to_input(self):
        self.dapp_name = self.body.get('dapp_name')
        self.dapp_package_name = self.body.get("dapp_package_name")
        self.notification_config = self.load_notification_config(self.body.get("notification_config"))
