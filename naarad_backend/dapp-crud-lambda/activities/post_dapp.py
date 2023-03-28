import time
import uuid

from naarad_common.helpers.aws.secrets_helper import SecretsManagerHelper
from naarad_common.helpers.firebase.firebase_admin_helper import FirebaseAdmin
from naarad_common.exceptions.invalid_input import InvalidInputException
from naarad_common.utils.common_constants import FIREBASE_API_KEY_SECRET_NAME

from activities.activity import DappActivity
from model.post_dapp_input import PostDappInput
from validators.post_dapp_validator import PostDappValidator


class PostDapp(DappActivity):
    def __init__(self):
        super().__init__()
        self.firebase_admin_helper = FirebaseAdmin.get_instance()
        self.validator = PostDappValidator()

    def update_user_accessible_dapps(self, user, dapp_obj):
        user_accessible_dapps = user.get("accessible_dapps")
        if not user_accessible_dapps:
            user_accessible_dapps = []
        user_accessible_dapps += [dapp_obj.get("dapp_name")]
        user["accessible_dapps"] = user_accessible_dapps
        self.api_key_table.write_item(user)

    def enact(self, user, post_input: PostDappInput):
        existing_dapp = self.dapp_table.scan("dapp_name", post_input.dapp_name)
        if len(existing_dapp) != 0:
            # ToDo: Add something to dapp names to make them unique. Only need uniqueness on API key level.
            raise InvalidInputException("Given dapp name already exists. Dapp names must be unique.")
        app_details = self.add_firebase_app(post_input.dapp_name, post_input.dapp_package_name)
        dapp_object = {
            "dapp_name": post_input.dapp_name,
            "dapp_package_name": post_input.dapp_package_name,
            **app_details,
            "dapp_uid": str(uuid.uuid4()),
            "notification_config": post_input.notification_config,
            "created_on": str(int(time.time())),
            "created_by": user.get("api_key")
        }
        self.dapp_table.write_item(dapp_object)
        self.update_user_accessible_dapps(user, dapp_object)
        return {
            "dapp_name": post_input.dapp_name,
            "dapp_package_name": post_input.dapp_package_name,
            "notification_config": post_input.notification_config,
            "created_on": dapp_object["created_on"]
        }

    def add_firebase_app(self, dapp_name, dapp_package_name):
        app_details = self.firebase_admin_helper.add_app_to_project(dapp_name, dapp_package_name)
        firebase_api_key = SecretsManagerHelper().get_secret(FIREBASE_API_KEY_SECRET_NAME)
        return {
            "firebase_data": {
                "app_id": app_details.get("appId"),
                "project_id": app_details.get("projectId"),
                "api_key": firebase_api_key
            }
        }
