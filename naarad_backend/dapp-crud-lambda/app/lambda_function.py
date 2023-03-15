import json
from dao.dapp import Dapp
from naarad_common.auth.simple_auth import SimpleAuth
from naarad_common.utils.misc_utils import MiscUtils


def lambda_handler(event, context):
    dapp = Dapp()
    method, path_parameters, query_string_parameters, body, headers = MiscUtils.parse_event(event)
    if not SimpleAuth().authorize_using_key(headers.get("Authorization")):
        return {
            "statusCode": 401,
            "body": json.dumps({
                "message": "The API key provided is not valid."
            })
        }
    try:
        if method == "POST":
            method_response = dapp.post(path_parameters, query_string_parameters, body)
        elif method == "GET":
            method_response = dapp.get(query_string_parameters)
        elif method == "PUT":
            method_response = dapp.put(path_parameters, query_string_parameters, body)
        elif method == "DELETE":
            method_response = dapp.delete(path_parameters, query_string_parameters, body)
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('Method is not available. Allowed methods: POST, GET, PUT, DELETE, OPTIONS')
            }
    except Exception as e:
        print(e)
        return {
            'statusCode': 400,
            'body': json.dumps({"message": str(e)})
        }
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
    event = {'resource': '/dapp', 'path': '/dapp/', 'httpMethod': 'POST', 'headers': {'accept': 'application/json, text/plain, */*', 'accept-encoding': 'gzip, deflate, br', 'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 'Authorization': 'AIzaSyCVYqzdB6i-htLOoiA6In7bU4FtolhGLUs', 'content-type': 'application/json', 'Host': 'eh9tvxkypk.execute-api.us-east-1.amazonaws.com', 'origin': 'http://localhost:3000', 'referer': 'http://localhost:3000/', 'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"', 'sec-ch-ua-mobile': '?0', 'sec-ch-ua-platform': '"macOS"', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'cross-site', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 'X-Amzn-Trace-Id': 'Root=1-640ed9af-2ce68f15008ea37f15e24ab7', 'X-Forwarded-For': '49.36.185.230', 'X-Forwarded-Port': '443', 'X-Forwarded-Proto': 'https'}, 'multiValueHeaders': {'accept': ['application/json, text/plain, */*'], 'accept-encoding': ['gzip, deflate, br'], 'accept-language': ['en-GB,en-US;q=0.9,en;q=0.8'], 'Authorization': ['AIzaSyCVYqzdB6i-htLOoiA6In7bU4FtolhGLUs'], 'content-type': ['application/json'], 'Host': ['eh9tvxkypk.execute-api.us-east-1.amazonaws.com'], 'origin': ['http://localhost:3000'], 'referer': ['http://localhost:3000/'], 'sec-ch-ua': ['"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"'], 'sec-ch-ua-mobile': ['?0'], 'sec-ch-ua-platform': ['"macOS"'], 'sec-fetch-dest': ['empty'], 'sec-fetch-mode': ['cors'], 'sec-fetch-site': ['cross-site'], 'User-Agent': ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'], 'X-Amzn-Trace-Id': ['Root=1-640ed9af-2ce68f15008ea37f15e24ab7'], 'X-Forwarded-For': ['49.36.185.230'], 'X-Forwarded-Port': ['443'], 'X-Forwarded-Proto': ['https']}, 'queryStringParameters': None, 'multiValueQueryStringParameters': None, 'pathParameters': None, 'stageVariables': None, 'requestContext': {'resourceId': 'ljc62u', 'resourcePath': '/dapp', 'httpMethod': 'POST', 'extendedRequestId': 'BtbzbGyDIAMF4Hw=', 'requestTime': '13/Mar/2023:08:07:11 +0000', 'path': '/dev/dapp/', 'accountId': '588747065691', 'protocol': 'HTTP/1.1', 'stage': 'dev', 'domainPrefix': 'eh9tvxkypk', 'requestTimeEpoch': 1678694831211, 'requestId': '55c8fd8c-5fa3-475d-8a54-58c3e5b898ac', 'identity': {'cognitoIdentityPoolId': None, 'accountId': None, 'cognitoIdentityId': None, 'caller': None, 'sourceIp': '49.36.185.230', 'principalOrgId': None, 'accessKey': None, 'cognitoAuthenticationType': None, 'cognitoAuthenticationProvider': None, 'userArn': None, 'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', 'user': None}, 'domainName': 'eh9tvxkypk.execute-api.us-east-1.amazonaws.com', 'apiId': 'eh9tvxkypk'}, 'body': '{"dapp_name":"someNewDapp","dapp_package_name":"com.example.anotherTest","notification_config":"{\\n}"}', 'isBase64Encoded': False}
    response = lambda_handler(event, "")
    print(response)
