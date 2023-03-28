from naarad_common.exceptions.resource_not_found import ResourceNotFoundException

from activities.activity import DappActivity
from model.get_dapp_input import GetDappInput
from validators.get_dapp_validator import GetDappValidator


class GetDappActivity(DappActivity):
    def __init__(self):
        super().__init__()
        self.validator = GetDappValidator()

    def get_dapp_by_name(self, dapp_name):
        dapp_list = self.dapp_table.scan("dapp_name", dapp_name)
        if len(dapp_list) == 0:
            raise ResourceNotFoundException("Given dapp name does not exist.")
        return dapp_list[0]

    @staticmethod
    def filter_display_fields(dapp, to_display_complete):
        if to_display_complete:
            return dapp
        return {
            "dapp_name": dapp.get("dapp_name"),
            "dapp_package_name": dapp.get("dapp_package_name"),
            "notification_config": dapp.get("notification_config"),
            "created_on": dapp.get("created_on")
        }

    def enact_get_dapp_by_name(self, get_input):
        dapp = self.get_dapp_by_name(get_input.dapp_name)
        return self.filter_display_fields(dapp, get_input.to_display_complete)

    def list_dapps(self, user, get_input):
        # Heavy IO operation on DB for multiple scans for dapp name. Put indexing on dapp name, or querying by api key
        return [self.filter_display_fields(self.get_dapp_by_name(dapp_name), get_input.to_display_complete)
                for dapp_name in user.get("accessible_dapps")]

    def enact(self, user, get_input: GetDappInput):
        if get_input.dapp_name is None:
            print("Processing request to list dApps for api key.")
            return self.list_dapps(user, get_input)
        print("Processing request to get dapp by name")
        return self.enact_get_dapp_by_name(get_input)
