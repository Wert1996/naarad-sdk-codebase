from activities.activity import DappActivity
from model.delete_dapp_input import DeleteDappInput
from validators.delete_dapp_validator import DeleteDappValidator

from naarad_common.helpers.firebase.firebase_admin_helper import FirebaseAdmin
from naarad_common.exceptions.resource_not_found import ResourceNotFoundException


class DeleteDappActivity(DappActivity):
    def __init__(self):
        super().__init__()
        self.validator = DeleteDappValidator()
        self.firebase_admin_helper = FirebaseAdmin.get_instance()

    def enact(self, user, delete_input: DeleteDappInput):
        dapp_list = self.dapp_table.scan("dapp_name", delete_input.dapp_name)
        if len(dapp_list) == 0:
            raise ResourceNotFoundException("Dapp could not be deleted. Dapp not found")
        dapp = dapp_list[0]
        # Delete app from firebase project
        dapp_firebase_id = dapp.get("firebase_data", {}).get("app_id")
        self.firebase_admin_helper.delete_app_from_project(dapp_firebase_id)
        # Delete from dApp table
        self.dapp_table.delete_item("dapp_uid", dapp.get("dapp_uid"), "dapp_name", delete_input.dapp_name)
        # Delete from user accessible dApps
        user_accessible_dapps = user.get("accessible_dapps")
        if user_accessible_dapps is None:
            user_accessible_dapps = []
        user_accessible_dapps.remove(delete_input.dapp_name)
        user["accessible_dapps"] = user_accessible_dapps
        self.api_key_table.write_item(user)
        return {
            "message": f"Dapp {delete_input.dapp_name} successfully deleted"
        }
