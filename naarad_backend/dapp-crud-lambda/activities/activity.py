import json


from naarad_common.exceptions.authorization_exception import AuthException
from naarad_common.exceptions.invalid_input import InvalidInputException
from naarad_common.exceptions.resource_not_found import ResourceNotFoundException
from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper
from naarad_common.utils.common_constants import DAPP_TABLE_NAME, API_KEY_TABLE_NAME


class DappActivity:
    def __init__(self):
        self.dapp_table = DynamoDBHelper.get_instance(DAPP_TABLE_NAME)
        self.api_key_table = DynamoDBHelper.get_instance(API_KEY_TABLE_NAME)
        self.validator = None

    def validate(self, user, activity_input):
        self.validator.validate(user, activity_input)

    def enact(self, user, activity_input):
        raise NotImplementedError

    def run(self, user, activity_input):
        try:
            self.validate(user, activity_input)
            response_body = self.enact(user, activity_input)
            return {
                "statusCode": 200,
                "body": json.dumps(response_body)
            }
        except InvalidInputException as e:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": str(e)})
            }
        except ResourceNotFoundException as e:
            return {
                "statusCode": 404,
                "body": json.dumps({"message": str(e)})
            }
        except AuthException as e:
            return {
                "statusCode": 401,
                "body": json.dumps({"message": str(e)})
            }
        except Exception as e:
            raise RuntimeError(e)
