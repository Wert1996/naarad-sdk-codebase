from naarad_common.exceptions.invalid_input import InvalidInputException
from naarad_common.utils.common_constants import FREE_TIER

from model.post_dapp_input import PostDappInput
from validators.validator import Validator


class PostDappValidator(Validator):
    @staticmethod
    def validate_dapp_limit(user):
        usage_tier, existing_dapps = user.get("plan"), user.get("accessible_dapps")
        if existing_dapps and len(existing_dapps) > 0 and usage_tier == FREE_TIER:
            raise InvalidInputException("Only one dApp allowed in the free usage tier.")

    @staticmethod
    def check_required_parameters(post_input):
        if not post_input.dapp_name or not post_input.dapp_package_name:
            raise InvalidInputException("Dapp name and Dapp package name must be provided.")

    def validate(self, user, post_input: PostDappInput):
        self.validate_dapp_limit(user)
        self.check_required_parameters(post_input)
