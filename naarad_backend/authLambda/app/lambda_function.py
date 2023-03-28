from activities.apikey_activity import ApiKeyActivity
import json


def lambda_handler(event, context):
    path = event.get("path")
    method_response = {
        "message": "Default response"
    }
    if "apiKey" in path:
        method_response = ApiKeyActivity().handle(event)
    return {
        'statusCode': 200,
        'body': json.dumps(method_response),
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        }
    }


if __name__ == "__main__":
    print(lambda_handler({
        "path": "/auth/apiKey",
        "httpMethod": "GET",
        "body": "{\"public_key\": \"kuchkey\"}"
    }, None))
