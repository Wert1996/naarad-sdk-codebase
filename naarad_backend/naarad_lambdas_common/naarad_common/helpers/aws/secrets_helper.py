import boto3
from botocore.exceptions import ClientError


class SecretsManagerHelper:
    def __init__(self, region="us-east-1"):
        self.region_name = region
        session = boto3.session.Session()
        self.client = session.client(
            service_name='secretsmanager',
            region_name=self.region_name
        )

    def get_secret(self, secret_name):
        try:
            get_secret_value_response = self.client.get_secret_value(
                SecretId=secret_name
            )
        except ClientError as e:
            # For a list of exceptions thrown, see
            # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
            raise e

        # Decrypts secret using the associated KMS key.
        secret = get_secret_value_response['SecretString']
        return secret
