import json

from naarad_common.exceptions.invalid_input import InvalidInputException

from model.activity_input import ActivityInput


class EditDappInput(ActivityInput):
    def __init__(self, event):
        self.notification_config, self.dapp_name = None, None
        super().__init__(event)

    @staticmethod
    def load_notification_config(notification_config):
        if notification_config is None:
            raise InvalidInputException("Please provide the modified notification config of your dApp.")
        try:
            return json.loads(notification_config)
        except Exception as e:
            raise InvalidInputException("Invalid json provided as notification config.")

    def convert_to_input(self):
        self.dapp_name = self.query_string_parameters.get("name")
        self.notification_config = self.load_notification_config(self.body.get("notification_config"))
