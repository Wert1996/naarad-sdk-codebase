from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper


class Authentication:
    def __init__(self):
        self.auth_table_helper = DynamoDBHelper("naaradauth")

    def login(self, body):
        public_key = body.get("public_key")
