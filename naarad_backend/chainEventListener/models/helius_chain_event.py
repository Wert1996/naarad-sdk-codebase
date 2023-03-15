from models.chain_event import ChainEvent


class HeliusChainEvent(ChainEvent):
    def __init__(self, raw_event):
        self.type, self.timestamp, self.description, \
            self.account_data, self.accounts = None, None, None, None, []
        super().__init__(raw_event)

    def get_involved_accounts(self):
        # ToDo: Which accounts actually exist in the account_data array ?
        return [item.get("account") for item in self.account_data]

    def parse_from_raw_event(self, raw_event):
        self.type, self.timestamp, self.description, \
            self.account_data = raw_event.get("type"), raw_event.get("timestamp"), raw_event.get("description"), \
            raw_event.get("accountData")
        self.accounts = self.get_involved_accounts()
