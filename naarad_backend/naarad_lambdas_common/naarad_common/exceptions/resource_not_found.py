class ResourceNotFoundException(Exception):
    def __init__(self, message):
        super().__init__(f"Resource not found: {message}")