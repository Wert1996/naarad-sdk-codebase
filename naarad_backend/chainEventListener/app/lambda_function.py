import json
from queue import Queue
from worker.chainEventProcessor import ChainEventProcessorThread
from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper
from naarad_common.helpers.firebase.firebase_admin import FirebaseAdmin
from notifiers.firebase_notifier import FirebaseNotifier
from naarad_common.utils.common_constants import DEVICES_TABLE_NAME, DAPP_TABLE_NAME
from naarad_common.auth.simple_auth import SimpleAuth

THREAD_LIMIT = 4


def execute_worker_threads(event_queue):
    devices_table_helper, dapp_table_helper = DynamoDBHelper.get_instance(DEVICES_TABLE_NAME), \
        DynamoDBHelper.get_instance(DAPP_TABLE_NAME)

    firebase_admin = FirebaseAdmin.get_instance()
    firebase_admin.initialize_app()
    firebase_notifier = FirebaseNotifier(firebase_admin.app)
    auth = SimpleAuth()
    thread_list = []
    for i in range(THREAD_LIMIT):
        thread = ChainEventProcessorThread(event_queue, auth, devices_table_helper, dapp_table_helper, firebase_notifier)
        thread.start()
        thread_list.append(thread)
    list(map(lambda worker_thread: worker_thread.join(), thread_list))


def initialize_event_queue(records):
    event_queue = Queue()
    for record in records:
        event_queue.put(json.loads(record.get('body')))
    return event_queue


def lambda_handler(event, context):
    print("Event received", event)
    chain_event_records = event.get('Records')
    print("Records received", chain_event_records)
    event_queue = initialize_event_queue(chain_event_records)
    execute_worker_threads(event_queue)
    return {
        'statusCode': 200,
        'body': json.dumps({
            "message": "Events processed successfully."
        })
    }
