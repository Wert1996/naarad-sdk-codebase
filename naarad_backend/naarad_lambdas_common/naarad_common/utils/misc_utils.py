import json


class MiscUtils:
    @staticmethod
    def parse_event(event):
        method = event.get("httpMethod")
        path_parameters = event.get("pathParameters")
        query_string_parameters = event.get("queryStringParameters")
        body = event.get("body")
        headers = event.get("headers")
        if event.get("body"):
            body = json.loads(body)
        else:
            body = {}
        if headers is None:
            headers = {}
        return method, path_parameters, query_string_parameters, body, headers