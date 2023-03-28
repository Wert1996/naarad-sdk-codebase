import json

from naarad_common.auth.api_key_auth import Auth
from naarad_common.exceptions.authorization_exception import AuthException

from activities.delete_dapp import DeleteDappActivity
from activities.edit_dapp import EditDappActivity
from activities.get_dapp import GetDappActivity
from activities.post_dapp import PostDapp
from model.delete_dapp_input import DeleteDappInput
from model.edit_dapp_input import EditDappInput
from model.get_dapp_input import GetDappInput
from model.post_dapp_input import PostDappInput


METHOD_DICT = {
        "POST": {
            "activity": PostDapp,
            "input": PostDappInput
        },
        "GET": {
            "activity": GetDappActivity,
            "input": GetDappInput
        },
        "PUT": {
            "activity": EditDappActivity,
            "input": EditDappInput
        },
        "DELETE": {
            "activity": DeleteDappActivity,
            "input": DeleteDappInput
        }
    }

COMMON_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
}


def lambda_handler(event, context):
    try:
        user = Auth().get_user(event)
    except AuthException as e:
        print("Headers", event.get("headers"))
        return {
            "statusCode": 401,
            "message": json.dumps({"message": str(e)})
        }
    http_method = event.get("httpMethod")
    if http_method not in METHOD_DICT:
        return {
            "statusCode": 405,
            "message": "Method not allowed.",
            "headers": COMMON_HEADERS
        }
    activity, api_input = METHOD_DICT[http_method]["activity"], METHOD_DICT[http_method]["input"]
    method_response = activity().run(user, api_input(event))
    return {
        **method_response,
        "headers": COMMON_HEADERS
    }


if __name__ == "__main__":
    event = {"resource": "/dapp", "path": "/dapp", "httpMethod": "GET", "headers": {"Accept-Encoding": "gzip", "Authorization": "Basic 2d961857-02a6-44ab-85a4-fea22e2b4d26", "Host": "eh9tvxkypk.execute-api.us-east-1.amazonaws.com", "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 10; SM-G960F Build/QP1A.190711.020)", "X-Amzn-Trace-Id": "Root=1-6422972d-4a02386d197ac4bd7788004f", "X-Forwarded-For": "49.36.187.240", "X-Forwarded-Port": "443", "X-Forwarded-Proto": "https"}, "multiValueHeaders": {"Accept-Encoding": ["gzip"], "Authorization": ["Basic 2d961857-02a6-44ab-85a4-fea22e2b4d26"], "Host": ["eh9tvxkypk.execute-api.us-east-1.amazonaws.com"], "User-Agent": ["Dalvik/2.1.0 (Linux; U; Android 10; SM-G960F Build/QP1A.190711.020)"], "X-Amzn-Trace-Id": ["Root=1-6422972d-4a02386d197ac4bd7788004f"], "X-Forwarded-For": ["49.36.187.240"], "X-Forwarded-Port": ["443"], "X-Forwarded-Proto": ["https"]}, "queryStringParameters": {"name": "androidTrial28?complete=True"}, "multiValueQueryStringParameters": {"name": ["androidTrial28?complete=True"]}, "pathParameters": None, "stageVariables": None, "requestContext": {"resourceId": "ljc62u", "resourcePath": "/dapp", "httpMethod": "GET", "extendedRequestId": "CeyPFH7KIAMF1pA=", "requestTime": "28/Mar/2023:07:28:45 +0000", "path": "/dev/dapp", "accountId": "588747065691", "protocol": "HTTP/1.1", "stage": "dev", "domainPrefix": "eh9tvxkypk", "requestTimeEpoch": 1679988525031, "requestId": "03febbc6-5230-4600-be58-c9f460792e09", "identity": {"cognitoIdentityPoolId": None, "accountId": None, "cognitoIdentityId": None, "caller": None, "sourceIp": "49.36.187.240", "principalOrgId": None, "accessKey": None, "cognitoAuthenticationType": None, "cognitoAuthenticationProvider": None, "userArn": None, "userAgent": "Dalvik/2.1.0 (Linux; U; Android 10; SM-G960F Build/QP1A.190711.020)", "user": None}, "domainName": "eh9tvxkypk.execute-api.us-east-1.amazonaws.com", "apiId": "eh9tvxkypk"}, "body": None, "isBase64Encoded": False}
    response = lambda_handler(event, None)
    print(response)
