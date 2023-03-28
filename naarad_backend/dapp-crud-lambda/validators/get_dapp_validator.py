from naarad_common.exceptions.authorization_exception import AuthException

from model.get_dapp_input import GetDappInput
from validators.validator import Validator


class GetDappValidator(Validator):
    def validate(self, user, get_dapp_input: GetDappInput):
        if get_dapp_input.dapp_name and get_dapp_input.dapp_name not in user.get("accessible_dapps"):
            raise AuthException("The provided API key does not have access to requested dApp, "
                                "or the dApp does not exist.")
