from naarad_common.utils.misc_utils import MiscUtils


class ActivityInput:
    def __init__(self, event):
        self.method, self.path_parameters, self.query_string_parameters, self.body, \
            self.headers = MiscUtils.parse_event(event)
        self.convert_to_input()

    def convert_to_input(self):
        raise NotImplementedError
