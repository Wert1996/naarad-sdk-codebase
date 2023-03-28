class AuthException(Exception):
    def __init__(self, message):
        super().__init__(f"Unauthorized Request: {message}")
