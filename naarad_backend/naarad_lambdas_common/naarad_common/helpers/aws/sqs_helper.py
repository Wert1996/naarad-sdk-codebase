import json

import boto3
import threading


class SqsHelper:
    # Max messages that can be fetched at a time
    SQS_RECEIVE_LIMIT = 10
    # Sometimes the api call returns 0 messages even when messages are available
    MAX_FETCH_ATTEMPTS = 5
    # Long polling duration for messages
    MESSAGE_WAIT_TIME = 10
    # Batch size for sending messages to sqs
    SQS_SEND_BATCH_SIZE = 10
    __singleton_instance = None
    __singleton_lock = threading.Lock()

    def __init__(self):
        self.sqs = boto3.client('sqs')

    @classmethod
    def get_instance(cls):
        with cls.__singleton_lock:
            if cls.__singleton_instance is None:
                cls.__singleton_instance = SqsHelper()
        return cls.__singleton_instance

    def fetch_messages_batch(self, queue_url, num_messages_to_fetch=1):
        messages_fetched = 0
        fetch_attempts = 0
        while messages_fetched < num_messages_to_fetch and fetch_attempts < self.MAX_FETCH_ATTEMPTS:
            messages_to_fetch = min(num_messages_to_fetch - messages_fetched, self.SQS_RECEIVE_LIMIT)
            response = self.sqs.receive_message(
                QueueUrl=queue_url,
                MaxNumberOfMessages=messages_to_fetch,
                WaitTimeSeconds=self.MESSAGE_WAIT_TIME
            )
            if "Messages" not in response or len(response.get("Messages")) == 0:
                # No messages received
                fetch_attempts += 1
                continue
            messages_fetched += len(response.get("Messages"))
            yield from response.get("Messages")
        return None

    def send_messages_to_queue(self, queue_url, entries: []):
        # TODO: SQS Dedupe
        messages = [{
            'Id': str(ind),
            'MessageBody': json.dumps(body)
        } for ind, body in enumerate(entries)]
        i = 0
        while i < len(messages):
            end_pointer = min(i + self.SQS_SEND_BATCH_SIZE, len(messages))
            response = self.sqs.send_message_batch(QueueUrl=queue_url, Entries=messages[i: end_pointer])
            i += self.SQS_SEND_BATCH_SIZE
            # print(response)

    def delete_messages_batch(self, queue_url, receipt_handles: []):
        entries = [{'Id': str(index), 'ReceiptHandle': handle} for index, handle in enumerate(receipt_handles)]
        self.sqs.delete_message_batch(QueueUrl=queue_url, Entries=entries)
