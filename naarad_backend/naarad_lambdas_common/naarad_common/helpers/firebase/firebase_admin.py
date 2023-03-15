from firebase_admin import credentials, initialize_app
import requests
from naarad_common.utils.common_constants import FIREBASE_PROJECT_URL, FIREBASE_API_URL, FIREBASE_SERVICE_ACCOUNT_KEY_SECRET
from naarad_common.helpers.aws.secrets_helper import SecretsManagerHelper
import time
import json
from threading import Lock


class FirebaseAdmin:
    __singleton_lock = Lock()
    __singleton_instance = None

    def __init__(self):
        self.credentials = self.get_firebase_service_account_key_creds()
        self.api_access_token = self.get_api_access_token()
        self.app = None

    @classmethod
    def get_instance(cls):
        with cls.__singleton_lock:
            if cls.__singleton_instance is not None:
                return cls.__singleton_instance
            cls.__singleton_instance = FirebaseAdmin()
        return cls.__singleton_instance

    def initialize_app(self):
        if self.app is not None:
            return
        print("Initialising Firebase..")
        self.app = initialize_app(self.credentials)

    @staticmethod
    def get_firebase_service_account_key_creds():
        service_account_key_json = json.loads(SecretsManagerHelper().get_secret(FIREBASE_SERVICE_ACCOUNT_KEY_SECRET))
        return credentials.Certificate(service_account_key_json)

    def get_api_access_token(self):
        return self.credentials.get_access_token().access_token

    def get_operation(self, operation_name):
        url = f"{FIREBASE_API_URL}{operation_name}"
        print(f"Getting operation with url {url}..")
        response = requests.get(url, headers={
            "Authorization": f"Bearer {self.api_access_token}"
        })
        print("Add App operation: ", response.json())
        return response

    def wait_till_operation_completes(self, operation_name):
        sleep_time = 1
        while True:
            response = self.get_operation(operation_name)
            if response.status_code != 200:
                raise Exception("Operation status could not be retrieved.")
            status = response.json().get("done")
            if status:
                break
            time.sleep(sleep_time)
        return response.json()

    def add_app_to_project(self, dapp_display_name, dapp_package_name):
        if dapp_display_name is None or dapp_package_name is None:
            raise Exception("Dapp needs a display name and package name.")
        url = FIREBASE_PROJECT_URL + "androidApps"
        headers = {
            "Authorization": f"Bearer {self.api_access_token}"
        }
        body = {
            "displayName": dapp_display_name,
            "packageName": dapp_package_name
        }
        print(f"Creating package with request body {body}")
        response = requests.post(url, headers=headers, json=body)
        if response.status_code != 200:
            print(f"Response from firebase: {response.status_code}, {response.headers}, {response.content}")
            print("New app could not be added to firebase.")
            raise Exception(f"New app could not be added.")
        response_json = response.json()
        operation_response = self.wait_till_operation_completes(response_json.get("name"))
        if "error" in operation_response:
            print("Error while trying to add new app to project.")
            raise Exception("Error while trying to register new dApp")
        return operation_response.get("response")


