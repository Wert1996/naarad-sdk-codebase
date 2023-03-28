class InvalidInputException(Exception):
    def __init__(self, message):
        super().__init__(f"Invalid Input to request: {message}")
