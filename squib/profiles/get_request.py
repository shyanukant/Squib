import threading 

thread_local =threading.local()

def get_current_request():
    return getattr(thread_local, 'request', None)

def set_current_request(request):
    thread_local.request = request

# Custom middleware to store the request object in the thread-local variable
class RequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        set_current_request(request)
        response = self.get_response(request)
        return response