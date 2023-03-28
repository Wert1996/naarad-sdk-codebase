import json

from naarad_common.exceptions.authorization_exception import AuthException
from naarad_common.exceptions.invalid_input import InvalidInputException

from model.edit_dapp_input import EditDappInput
from validators.validator import Validator


class EditDappValidator(Validator):
    @staticmethod
    def check_access(user, edit_dapp_input):
        if edit_dapp_input.dapp_name not in user.get("accessible_dapps"):
            raise AuthException("This API key does not have access to the provided dApp, or the dApp does not exist.")

    def validate(self, user, edit_dapp_input: EditDappInput):
        if edit_dapp_input.dapp_name is None:
            raise InvalidInputException("Please provide the name of the dapp to edit.")
        if edit_dapp_input.notification_config is None:
            raise InvalidInputException("Please provide the modified notification config of your dApp.")
        if len(edit_dapp_input.body.keys()) > 1:
            raise InvalidInputException("Edit Dapp only allows editing the notification config. "
                                        "All other properties are immutable.")
        self.check_access(user, edit_dapp_input)
