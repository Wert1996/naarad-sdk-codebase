import json

from naarad_common.helpers.aws.sqs_helper import SqsHelper
from naarad_common.helpers.aws.s3_helper import S3Helper
from naarad_common.helpers.helius_helper import HeliusApiHelper
from naarad_common.utils.common_constants import ACCOUNT_TRACKING_REQUESTS_QUEUE_URL, \
    NAARAD_MISC_BUCKET_NAME, ACCOUNTS_LIST_FILE, WEBHOOK_DATA_FILE

# Fetch below number of messages at once from sqs queue, to update Helius webhook
MESSAGE_BATCH_SIZE = 100


def get_existing_account_list():
    s3_helper = S3Helper.get_instance()
    # ToDo: String size needs to be considered.
    accounts_list_text = s3_helper.read_complete_object(NAARAD_MISC_BUCKET_NAME, ACCOUNTS_LIST_FILE)
    return accounts_list_text.split()


def update_existing_account_list(updated_account_list):
    updated_account_list_text = " ".join(updated_account_list)
    S3Helper.get_instance().write_content_to_object(NAARAD_MISC_BUCKET_NAME,
                                                    ACCOUNTS_LIST_FILE, updated_account_list_text)


def get_webhook_data():
    return json.loads(S3Helper.get_instance().read_complete_object(NAARAD_MISC_BUCKET_NAME, WEBHOOK_DATA_FILE))


def delete_messages(sqs_helper, message_batch):
    print("Deleting processed messages from queue.")
    receipt_handles = [message.get("ReceiptHandle") for message in message_batch]
    sqs_helper.delete_messages_batch(queue_url=ACCOUNT_TRACKING_REQUESTS_QUEUE_URL, receipt_handles=receipt_handles)


def lambda_handler(event, context):
    sqs_helper = SqsHelper.get_instance()
    print("Fetching new messages batch from sqs..")
    message_batch = list(sqs_helper.fetch_messages_batch(ACCOUNT_TRACKING_REQUESTS_QUEUE_URL, MESSAGE_BATCH_SIZE))
    new_accounts = [message.get('Body') for message in message_batch]

    print(f"New account requests found in sqs: {new_accounts}")

    print("Retrieving list of existing accounts.")
    existing_accounts = set(get_existing_account_list())
    new_accounts = [account for account in new_accounts if account not in existing_accounts]
    if len(new_accounts) == 0:
        print("No new accounts to be added..")
        delete_messages(sqs_helper, message_batch)
        return {
            "message": "No new accounts to be added."
        }

    updated_account_list = list(set(list(existing_accounts) + new_accounts))

    webhook_data = get_webhook_data()
    webhook_data["accountAddresses"] = updated_account_list
    print("Updating Helius with new accounts list..")
    response = HeliusApiHelper().edit_webhook_data(webhook_data)
    if response.status_code != 200:
        print(response.status_code, response.content)
        raise Exception("Helius api returned an error.")

    print("Updated Helius.")

    print("Updating account list on s3")
    update_existing_account_list(updated_account_list)

    delete_messages(sqs_helper, message_batch)
    return {
        "message": "Accounts added successfully"
    }
