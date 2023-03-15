import requests
from naarad_common.utils.common_constants import HELIUS_API_WEBHOOK_URL, HELIUS_WEBHOOK_ID, HELIUS_API_KEY_SECRET
from naarad_common.helpers.aws.secrets_helper import SecretsManagerHelper


class HeliusApiHelper:
    def __init__(self):
        self.webhook_api_url = f"{HELIUS_API_WEBHOOK_URL}{HELIUS_WEBHOOK_ID}?api-key={self.get_helius_api_key()}"

    @staticmethod
    def get_helius_api_key():
        return SecretsManagerHelper().get_secret(HELIUS_API_KEY_SECRET)

    def get_webhook_data(self):
        response = requests.get(self.webhook_api_url)
        return response.json()

    def edit_webhook_data(self, data: dict):
        print(f"Editing webhook data. Url: {self.webhook_api_url}, Data: {data}")
        response = requests.put(self.webhook_api_url, json=data)
        return response

    def add_address_to_webhook(self, account_address: str):
        # This makes 2 Helius API calls. This data should be stored somewhere to avoid the unnecessary calls
        webhook_data = self.get_webhook_data()
        webhook_data["accountAddresses"].append(account_address)
        webhook_data.pop("wallet")
        webhook_data.pop("webhookID")
        self.edit_webhook_data(webhook_data)
