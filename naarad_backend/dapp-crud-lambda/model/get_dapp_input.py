from model.activity_input import ActivityInput


class GetDappInput(ActivityInput):
    def __init__(self, event):
        self.dapp_name = None
        self.to_display_complete = False
        super().__init__(event)

    def convert_to_input(self):
        if self.query_string_parameters:
            self.dapp_name = self.query_string_parameters.get("name")
            self.to_display_complete = self.query_string_parameters.get("complete") in ["true", "True", "1"]