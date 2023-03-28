from naarad_common.exceptions.authorization_exception import AuthException
from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper
from naarad_common.utils.common_constants import API_KEY_TABLE_NAME, API_KEY_STATUS_ACTIVE


class Auth:
    def __init__(self):
        self.api_key_table_helper = DynamoDBHelper.get_instance(API_KEY_TABLE_NAME)

    def get_accessible_dapps(self, authorization):
        api_key = self.extract_api_key(authorization)
        api_key_details = self.api_key_table_helper.get("api_key", api_key)
        if api_key_details is None:
            raise AuthException("Invalid API key provided.")
        return api_key_details.get("dapps")

    @staticmethod
    def extract_api_key(authorization):
        authorization_string_split = authorization.split()
        if len(authorization_string_split) != 2:
            raise AuthException("Invalid auth header.")
        auth_type, api_key = authorization_string_split
        if auth_type != "Basic":
            raise AuthException("Invalid auth header.")
        return api_key

    def get_api_key_entity(self, authorization):
        api_key = self.extract_api_key(authorization)
        api_key_details = self.api_key_table_helper.get("api_key", api_key)
        if api_key_details is None:
            raise AuthException("Invalid API key provided.")
        return api_key_details

    @staticmethod
    def get_authorization_header(headers):
        if headers is None:
            raise AuthException("Headers are not present.")
        if not isinstance(headers, dict):
            raise AuthException("Unexpected header type.")
        authorization = headers.get("authorization")
        if authorization is None:
            authorization = headers.get("Authorization")
        if authorization is None:
            raise AuthException("Authorization header needs to be present.")
        return authorization

    def get_user(self, event):
        authorization = self.get_authorization_header(event.get("headers"))
        api_key = self.extract_api_key(authorization)
        api_key_details = self.api_key_table_helper.get("api_key", api_key)
        if api_key_details is None:
            raise AuthException("Invalid API key provided.")
        if api_key_details.get("status") != API_KEY_STATUS_ACTIVE:
            raise AuthException("Api Key is not in active state.")
        return api_key_details

    def add_api_key(self, api_key: dict):
        api_key["api_key"] = api_key["key"]
        api_key.pop("key")
        api_key["accessible_dapps"] = []
        self.api_key_table_helper.write_item(api_key)
