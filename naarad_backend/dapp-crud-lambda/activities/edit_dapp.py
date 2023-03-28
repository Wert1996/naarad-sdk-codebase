from naarad_common.exceptions.resource_not_found import ResourceNotFoundException

from activities.activity import DappActivity
from model.edit_dapp_input import EditDappInput
from validators.edit_dapp_validator import EditDappValidator


class EditDappActivity(DappActivity):
    def __init__(self):
        super().__init__()
        self.validator = EditDappValidator()

    def enact(self, user, edit_input: EditDappInput):
        dapp_list = self.dapp_table.scan("dapp_name", edit_input.dapp_name)
        if len(dapp_list) == 0:
            raise ResourceNotFoundException("Given dapp name does not exist.")
        dapp = dapp_list[0]
        dapp["notification_config"] = edit_input.notification_config
        self.dapp_table.write_item(dapp)
        return {
            "dapp_name": dapp.get("dapp_name"),
            "dapp_package_name": dapp.get("dapp_package_name"),
            "notification_config": dapp.get("notification_config"),
            "created_on": dapp.get("created_on")
        }
