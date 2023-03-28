import json

from naarad_common.exceptions.authorization_exception import AuthException
from naarad_common.helpers.aws.ddb_helper import DynamoDBHelper
from naarad_common.helpers.aws.sqs_helper import SqsHelper
# from naarad_common.helpers.helius_helper import HeliusApiHelper
# from naarad_common.auth.simple_auth import SimpleAuth
from naarad_common.auth.api_key_auth import Auth
from naarad_common.utils.common_constants import DEVICES_TABLE_NAME, ACCOUNT_TRACKING_REQUESTS_QUEUE_URL
from naarad_common.utils.misc_utils import MiscUtils


def lambda_handler(event, context):
    # Helius allows 10 API calls per minute within the free tier. Send to sqs and process separately.
    try:
        user = Auth().get_user(event)
    except AuthException as e:
        return {
            "statusCode": 401,
            "body": json.dumps({
                "message": f"Unauthorized request: {str(e)}"
            })
        }
    method, path_parameters, query_string_parameters, body, headers = MiscUtils.parse_event(event)
    if method == "POST":
        wallet_address, device_token, dapp_name = body.get("wallet_address"), \
            body.get("device_token"), body.get("dapp_name")
        # ToDo: Check if wallet address and device token are valid entities.
        if None in [wallet_address, device_token, dapp_name]:
            return {
                'statusCode': 400,
                'body': json.dumps({"message": 'Wallet address, device token and device type are required fields'})
            }
        if dapp_name not in user.get("accessible_dapps"):
            return {
                "statusCode": 401,
                "body": json.dumps({
                    "message": f"Unauthorized request: Given API key does not have access to the dApp, "
                               f"or the dApp does not exist."
                })
            }
        DynamoDBHelper(DEVICES_TABLE_NAME).write_item({
            "wallet_address": wallet_address,
            "device_token": device_token,
            "dapp_name": dapp_name
        })
        # Send account address to queue and handle asynchronously
        sqs_helper = SqsHelper.get_instance()
        sqs_helper.send_messages_to_queue(ACCOUNT_TRACKING_REQUESTS_QUEUE_URL, [wallet_address])
        # HeliusApiHelper().add_address_to_webhook(wallet_address)
        return {
            'statusCode': 200,
            'body': json.dumps({"message": "Device has been successfully added."}),
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            }
        }
    else:
        return {
            'statusCode': 404,
            'body': json.dumps('Method is not available. Allowed methods: POST.')
        }
