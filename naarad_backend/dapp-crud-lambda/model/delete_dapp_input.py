from naarad_common.exceptions.invalid_input import InvalidInputException

from model.activity_input import ActivityInput


class DeleteDappInput(ActivityInput):
    def __init__(self, event):
        self.dapp_name = None
        super().__init__(event)

    def convert_to_input(self):
        if not self.query_string_parameters:
            raise InvalidInputException("Dapp name not present in query strings")
        self.dapp_name = self.query_string_parameters.get("name")
