from queue import Queue
from threading import Thread
from models.helius_chain_event import HeliusChainEvent
from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper
from notifiers.notifier import Notifier
import json


class ChainEventProcessorThread(Thread):
    def __init__(self, event_queue: Queue, devices_table_helper: DynamoDBHelper,
                 dapps_table_helper: DynamoDBHelper, notification_sender: Notifier):
        super().__init__()
        self.event_queue = event_queue
        self.devices_table_helper = devices_table_helper
        self.dapps_table_helper = dapps_table_helper
        self.notification_sender = notification_sender

    def send_notification(self, event: HeliusChainEvent, wallet, dapp_details):
        # ToDo: Create events in main runner. Create translators for events.
        notification_config = dapp_details.get("notification_config")
        if event.type not in notification_config:
            print("No need to send notification for this event type.")
            return
        notification_data = notification_config[event.type]
        print(f"Sending notification to {wallet}..")
        self.notification_sender.send_notification(wallet.get("device_token"),
                                                   dapp_details.get("dapp_name"),
                                                   {
                                                        "data": json.dumps(event.__dict__),
                                                        "extra_data": json.dumps(notification_data)
                                                   })

    def get_dapp_details(self, dapp_name):
        items = self.dapps_table_helper.scan("dapp_name", dapp_name)
        if len(items) == 0:
            raise RuntimeError("Dapp with given name was not found in the DDB table.")
        return items[0]

    def process_event(self, event: HeliusChainEvent):
        print("Processing event", event)
        accounts = event.get_involved_accounts()
        print("Involved accounts", accounts)
        # Filter accounts which exist in our DB (subscribed devices). Get their tokens, and dapps.
        registered_wallets = list(filter(lambda item: item is not None,
                                    self.devices_table_helper.batch_get(primary_key_name="wallet_address",
                                                                        primary_key_values=accounts)))
        print("Accounts registered", registered_wallets)
        dapp_name_list = set([item.get("dapp_name") for item in registered_wallets if item.get("dapp_name")])
        dapp_details_map = {dapp_name: self.get_dapp_details(dapp_name) for dapp_name in dapp_name_list}
        list(map(lambda wallet: self.send_notification(event, wallet, dapp_details_map.get(wallet.get("dapp_name"))),
                 registered_wallets))

    def run(self):
        while not self.event_queue.empty():
            events = self.event_queue.get()
            events = [HeliusChainEvent(event) for event in events]
            list(map(self.process_event, events))
