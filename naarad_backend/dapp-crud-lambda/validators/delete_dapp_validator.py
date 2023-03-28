from naarad_common.exceptions.authorization_exception import AuthException
from naarad_common.exceptions.invalid_input import InvalidInputException

from model.delete_dapp_input import DeleteDappInput
from validators.validator import Validator


class DeleteDappValidator(Validator):
    @staticmethod
    def check_access(user, delete_dapp_input):
        if delete_dapp_input.dapp_name not in user.get("accessible_dapps"):
            raise AuthException("This API key does not have access to the provided dApp, or the dApp does not exist.")

    def validate(self, user, delete_dapp_input: DeleteDappInput):
        if delete_dapp_input.dapp_name is None:
            raise InvalidInputException("Please provide the name of the dApp you would like to delete.")
        self.check_access(user, delete_dapp_input)
