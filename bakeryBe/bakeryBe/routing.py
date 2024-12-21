from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from products.consumers import TaskUpdateConsumer
from django.core.asgi import get_asgi_application


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter([
            path('ws/task-updates/', TaskUpdateConsumer.as_asgi()),  # WebSocket URL
        ])
    ),
})
