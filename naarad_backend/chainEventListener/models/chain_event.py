class ChainEvent:
    def __init__(self, raw_event):
        self.parse_from_raw_event(raw_event)

    def parse_from_raw_event(self, raw_event):
        raise NotImplementedError
