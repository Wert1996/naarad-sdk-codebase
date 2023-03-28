import time
import uuid

from naarad_common.auth.api_key_auth import Auth
from naarad_common.exceptions.invalid_input import InvalidInputException
from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper
from naarad_common.utils.common_constants import AUTH_TABLE_NAME
from naarad_common.utils.misc_utils import MiscUtils


class ApiKeyActivity:
    def __init__(self):
        self.ddb_helper = DynamoDBHelper(AUTH_TABLE_NAME)
    # def authenticate(self, body):
    #     public_key, session_id = body.get("public_key"), body.get("session_id")

    def handle(self, event):
        method, path_parameters, query_string_parameters, body, headers = MiscUtils.parse_event(event)
        # self.authenticate(body)
        if method == "POST":
            return self.create_api_key(body)
        elif method == "GET":
            return self.get_api_keys(query_string_parameters)

    def get_api_keys(self, parameters):
        auth_entity = self.get_auth_entity(parameters.get("publicKey"))
        if not auth_entity:
            return {
                "api_keys": []
            }
        api_keys = auth_entity.get("api_keys", [])
        return {
            "api_keys": api_keys
        }

    @staticmethod
    def validate_post_request(auth_entity):
        # ToDo: Check subscription plan for api key limit
        subscription_plan = auth_entity.get("plan", "free")

        api_keys = auth_entity.get("api_keys", [])
        if api_keys and subscription_plan != "premium":
            raise InvalidInputException("Only 1 API key allowed in the free usage tier")

    def get_auth_entity(self, public_key):
        if public_key is None:
            raise InvalidInputException("Public key cannot be none")
        auth_entity = self.ddb_helper.get("public_key", public_key)
        return auth_entity

    @staticmethod
    def generate_api_key_string():
        return str(uuid.uuid4())

    def create_api_key(self, body):
        auth_entity = self.get_auth_entity(body.get("public_key"))
        if auth_entity:
            self.validate_post_request(auth_entity)
        else:
            auth_entity = {
                "public_key": body.get("public_key"),
                "plan": "free",
                "api_keys": []
            }
        new_api_key = {
            "key": self.generate_api_key_string(),
            "created_on": str(int(time.time())),
            "status": "active"
        }
        existing_api_keys = auth_entity.get("api_keys")
        if existing_api_keys is None:
            existing_api_keys = []

        auth_entity["api_keys"] = existing_api_keys + [new_api_key]
        self.ddb_helper.write_item(auth_entity)
        Auth().add_api_key(new_api_key)
        return {
            "api_keys": auth_entity["api_keys"]
        }
