import uuid
import json

from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper
from naarad_common.utils.common_constants import DAPP_TABLE_NAME
from naarad_common.helpers.firebase.firebase_admin import FirebaseAdmin


class InvalidInputException(Exception):
    def __init__(self, message):
        super.__init__(message)


class Dapp:
    def __init__(self):
        self.ddb_helper = DynamoDBHelper(DAPP_TABLE_NAME)

    def validate_post(self, path_params, query_string_params, body):
        dapp_name = body.get('dapp_name')
        dapp_package_name = body.get("dapp_package_name")
        if not dapp_name or not dapp_package_name:
            raise InvalidInputException("Dapp name and Dapp package name must be provided.")
        notification_config = body.get("notification_config")
        if notification_config is not None:
            try:
                json.loads(notification_config)
            except Exception as e:
                raise InvalidInputException("Invalid json provided as notification config.")
        item = self.get({"name": dapp_name})
        if item:
            raise InvalidInputException("Dapp with this name already exists.")

    @staticmethod
    def add_firebase_app(dapp_details):
        firebase_helper = FirebaseAdmin.get_instance()
        app_details = firebase_helper.add_app_to_project(dapp_details.get("dapp_name"),
                                                         dapp_details.get("dapp_package_name"))
        return {
            "firebase_data": {
                "app_id": app_details.get("appId")
            }
        }

    def post(self, path_parameters, query_string_parameters, body):
        self.validate_post(path_parameters, query_string_parameters, body)
        app_details = self.add_firebase_app(body)
        notification_config = body.get("notification_config")
        if notification_config is None:
            notification_config = {}
        else:
            notification_config = json.loads(notification_config)
        body["notification_config"] = notification_config
        dapp_details = {**body, **app_details, 'dapp_uid': str(uuid.uuid4())}
        self.ddb_helper.write_item(dapp_details)
        dapp_details.pop('dapp_uid')
        return dapp_details

    def put(self, path_parameters, query_string_parameters, body):
        pass

    def delete(self, path_parameters, query_string_parameters, body):
        pass

    def get(self, query_string_parameters):
        dapp_name = query_string_parameters.get("name")
        if dapp_name is None:
            raise InvalidInputException("Dapp name must be provided in a get call")
        items = self.ddb_helper.scan("dapp_name", dapp_name)
        if len(items) == 0:
            return {}
        return items[0]
