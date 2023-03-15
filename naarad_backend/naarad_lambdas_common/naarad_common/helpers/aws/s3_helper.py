import boto3
import threading


class S3Helper:
    __singleton_instance = None
    __singleton_lock = threading.Lock()

    def __init__(self):
        self.s3 = boto3.resource('s3')

    @classmethod
    def get_instance(cls):
        with cls.__singleton_lock:
            if cls.__singleton_instance is None:
                cls.__singleton_instance = S3Helper()
        return cls.__singleton_instance

    def read_complete_object(self, bucket_name, object_prefix):
        obj = self.s3.Object(bucket_name, object_prefix)
        return obj.get()['Body'].read().decode("utf-8")

    def write_content_to_object(self, bucket_name, object_prefix, content):
        self.s3.Object(bucket_name, object_prefix).put(Body=content)
