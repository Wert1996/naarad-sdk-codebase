from naarad_common.helpers.aws.secrets_helper import SecretsManagerHelper
from naarad_common.utils.common_constants import FIREBASE_API_KEY_SECRET_NAME


class SimpleAuth:
    def __init__(self):
        self.secrets_helper = SecretsManagerHelper()
        self.api_key = None

    def get_api_key(self):
        if self.api_key is not None:
            return self.api_key
        self.api_key = self.secrets_helper.get_secret(FIREBASE_API_KEY_SECRET_NAME)
        return self.api_key

    def authorize_using_key(self, api_key):
        return api_key == self.get_api_key()
