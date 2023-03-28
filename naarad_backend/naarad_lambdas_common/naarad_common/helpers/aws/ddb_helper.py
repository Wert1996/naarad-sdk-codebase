import boto3
import threading

from boto3.dynamodb.conditions import Key


class DynamoDBHelper:
    MAX_GET_BATCH_SIZE = 100
    __singleton_lock = threading.Lock()
    __singleton_instances = {}

    def __init__(self, table_name: str):
        self.table_name = table_name
        self.ddb = boto3.resource('dynamodb')
        self.table = self.ddb.Table(table_name)

    @classmethod
    def get_instance(cls, table_name: str):
        with cls.__singleton_lock:
            if cls.__singleton_instances.get(table_name) is None:
                cls.__singleton_instances[table_name] = DynamoDBHelper(table_name)
        return cls.__singleton_instances[table_name]

    def scan(self, attribute_name, value):
        response = self.table.scan(FilterExpression=Key(attribute_name).eq(value))
        return response['Items']

    def get(self, key_name: str, value):
        response = self.table.get_item(Key={key_name: value})
        return response.get('Item')

    def write_item(self, item=None):
        if item is None:
            raise Exception("Item to write cannot be None.")
        try:
            self.table.put_item(Item=item)
        except Exception as e:
            print(e)
            raise RuntimeError(e)

    def delete_item(self, key_name: str, value, sort_key=None, sort_key_value=None):
        if sort_key:
            self.table.delete_item(Key={key_name: value, sort_key: sort_key_value})
        else:
            self.table.delete_item(Key={key_name: value})

    def query_items(self, index_name: str, key_name: str, value):
        response = self.table.query(
            IndexName=index_name,
            KeyConditionExpression=Key(key_name).eq(value)
        )
        return response.get("Items")

    def write_items_in_batch(self, items: []):
        with self.table.batch_writer() as batch:
            for item in items:
                # print(item)
                batch.put_item(Item=item)

    def batch_get(self, primary_key_name: str, primary_key_values: []):
        i = 0
        items_retrieved = []
        while i < len(primary_key_values):
            end_index = min(i+self.MAX_GET_BATCH_SIZE, len(primary_key_values))
            requested_items = primary_key_values[i: end_index]
            items_retrieved_temp = []
            attempts = 0
            while attempts < 10:
                response = self.ddb.batch_get_item(RequestItems={
                    self.table_name: {
                        'Keys': [{primary_key_name: value} for value in requested_items]
                    }
                })
                unprocessed_keys = response.get("UnprocessedKeys", {}).get(self.table_name, {}).get("Keys", [])
                items_retrieved_temp += response.get('Responses', {}).get(self.table_name, [])
                attempts += 1
                if len(unprocessed_keys) == 0:
                    break
                requested_items = unprocessed_keys
            items_retrieved += items_retrieved_temp
            i += self.MAX_GET_BATCH_SIZE
        return items_retrieved
